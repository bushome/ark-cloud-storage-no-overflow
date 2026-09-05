import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { DatabaseService } from "../../database/service/database.service";
import { StorageDto } from "../dto/storage.dto";
import { DedicatedStorageDto } from "../dto/dedicated-storage.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

type DeductionWaiter = {
    resolve: () => void;
    reject: (error: unknown) => void;
};

type PendingDeduction = {
    clusterId: string;
    ownerId: number;
    resourceId: string;
    totalCost: number;
    waiters: DeductionWaiter[];
};

type ResourceLock = {
    tail: Promise<void>;
    pending: PendingDeduction | null;
    timer: NodeJS.Timeout | null;
};

/**
 * Inventory service for dedicated storage.
 * Writes to a given cluster/owner/resource are serialized so crafts and
 * deposits cannot lock-wait on the same MySQL row. Empty crafts fail from
 * the in-memory cache without hitting the database.
 */
@Injectable()
export class InventoryService {
    private readonly logger = new Logger(InventoryService.name);
    private readonly knownAmounts = new Map<string, number>();
    private readonly locks = new Map<string, ResourceLock>();
    private readonly batchWindowMs: number;

    public constructor(
        private readonly databaseService: DatabaseService,
        private readonly eventEmitter: EventEmitter2,
    ) {
        this.batchWindowMs = Number(process.env.INVENTORY_BATCH_WINDOW_MS) || 100;
    }

	public async getInventory(clusterId: string): Promise<StorageDto[]> {
		const storage: StorageDto[] = [];
		const dedicatedStorage =
        await this.databaseService.dedicatedStorage.findMany({
            where: { clusterId },
        });
    for (const storageItem of dedicatedStorage) {
        storage.push(DedicatedStorageDto.fromDatabase(storageItem));
        const key = this.resourceKey(
            storageItem.clusterId,
            storageItem.ownerId,
            storageItem.resourceId,
        );
        // Always refresh from the DB read we just paid for, rather than
        // only filling gaps — this keeps the cache self-healing on every
        // subscribe/fetch instead of trusting a possibly-stale entry.
        this.knownAmounts.set(key, storageItem.amount);
		}
		return storage;
	}

    public async updateInventory(
        clusterId: string,
        storage: StorageDto,
    ): Promise<void> {
        switch (storage.type) {
            case "dedicated":
                await this.setDedicatedStorage(
                    clusterId,
                    storage as DedicatedStorageDto,
                );
                break;
            default:
                throw new BadRequestException("Invalid storage type");
        }
    }

    private async setDedicatedStorage(
        clusterId: string,
        storage: DedicatedStorageDto,
    ): Promise<void> {
        const key = this.resourceKey(
            clusterId,
            storage.ownerId,
            storage.resourceId,
        );

        if (storage.amount >= 0) {
            this.flushPendingNow(key);
            await this.enqueue(key, () =>
                this.applyDeposit(key, clusterId, storage),
            );
            return;
        }

        await this.enqueueDeduction(key, clusterId, storage);
    }

    private async applyDeposit(
        key: string,
        clusterId: string,
        storage: DedicatedStorageDto,
    ): Promise<void> {
        this.logger.log(
            `Adding ${storage.amount} ${storage.resourceId} for cluster ${clusterId} owner ${storage.ownerId}`,
        );
        const updateStorage =
            await this.databaseService.dedicatedStorage.upsert({
                where: {
                    clusterId_ownerId_resourceId: {
                        clusterId,
                        ownerId: storage.ownerId,
                        resourceId: storage.resourceId,
                    },
                },
                create: {
                    clusterId,
                    resourceId: storage.resourceId,
                    ownerId: storage.ownerId,
                    amount: storage.amount,
                },
                update: {
                    amount: { increment: storage.amount },
                },
            });
        this.knownAmounts.set(key, updateStorage.amount);
        this.emitInventoryUpdate(
            clusterId,
            DedicatedStorageDto.fromDatabase(updateStorage),
        );
    }

    /**
     * Coalesces crafts for up to 100ms, then deducts on the per-key chain.
     * Callers await this so websocket errors go to the requesting socket only.
     */
    private enqueueDeduction(
        key: string,
        clusterId: string,
        storage: DedicatedStorageDto,
    ): Promise<void> {
        const cost = Math.abs(storage.amount);
        const cached = this.knownAmounts.get(key);
        if (cached !== undefined && cached < cost) {
            return Promise.reject(this.insufficientResources());
        }

        const lock = this.getLock(key);
        if (
            lock.pending &&
            cached !== undefined &&
            lock.pending.totalCost + cost > cached
        ) {
            this.flushPendingNow(key);
        }

        return new Promise((resolve, reject) => {
            this.startOrJoinBatch(
                key,
                clusterId,
                storage.ownerId,
                storage.resourceId,
                cost,
                resolve,
                reject,
            );
        });
    }

    private startOrJoinBatch(
        key: string,
        clusterId: string,
        ownerId: number,
        resourceId: string,
        cost: number,
        resolve: () => void,
        reject: (error: unknown) => void,
    ): void {
        const lock = this.getLock(key);
        if (!lock.pending) {
            lock.pending = {
                clusterId,
                ownerId,
                resourceId,
                totalCost: 0,
                waiters: [],
            };
            lock.timer = setTimeout(() => {
                lock.timer = null;
                this.flushPendingNow(key);
            }, this.batchWindowMs); // changed from hardcoded 100
        }
        lock.pending.totalCost += cost;
        lock.pending.waiters.push({ resolve, reject });
    }

    private flushPendingNow(key: string): void {
        const pending = this.takePending(key);
        if (!pending) {
            return;
        }
        void this.enqueue(key, async () => {
            try {
                await this.applyDeduction(key, pending);
                for (const waiter of pending.waiters) {
                    waiter.resolve();
                }
            } catch (error) {
                for (const waiter of pending.waiters) {
                    waiter.reject(error);
                }
            }
        });
    }

	private async applyDeduction(key: string, pending: PendingDeduction): Promise<void> {
    const { clusterId, ownerId, resourceId, totalCost } = pending;
    const cached = this.knownAmounts.get(key);
    if (cached !== undefined && cached < totalCost) {
        await this.resyncCache(key, clusterId, ownerId, resourceId);
        void this.logDeduction(clusterId, ownerId, resourceId, totalCost, false, cached);
        throw this.insufficientResources();
    }

    const row = await this.databaseService.$transaction(async (tx) => {
        const result = await tx.dedicatedStorage.updateMany({
            where: { clusterId, ownerId, resourceId, amount: { gte: totalCost } },
            data: { amount: { decrement: totalCost } },
        });
        if (result.count === 0) {
            return null;
        }
        return tx.dedicatedStorage.findUnique({
            where: { clusterId_ownerId_resourceId: { clusterId, ownerId, resourceId } },
        });
    });

    if (!row) {
        await this.resyncCache(key, clusterId, ownerId, resourceId);
        void this.logDeduction(clusterId, ownerId, resourceId, totalCost, false, cached ?? 0);
        throw this.insufficientResources();
    }

    this.knownAmounts.set(key, row.amount);
    void this.logDeduction(clusterId, ownerId, resourceId, totalCost, true, row.amount);
    this.emitInventoryUpdate(clusterId, DedicatedStorageDto.fromDatabase(row));
}

private logDeduction(
    clusterId: string,
    ownerId: number,
    resourceId: string,
    totalCost: number,
    succeeded: boolean,
    balanceAtEvent: number,
): Promise<void> {
    return this.databaseService.deductionAuditLog
        .create({ data: { clusterId, ownerId, resourceId, totalCost, succeeded, balanceAtEvent } })
        .then(() => undefined)
        .catch((err) => {
            this.logger.warn(`Failed to write audit log: ${err}`);
        });
}

	private async resyncCache(
		key: string,
		clusterId: string,
		ownerId: number,
		resourceId: string,
	): Promise<void> {
		const current = await this.databaseService.dedicatedStorage.findUnique({
			where: {
				clusterId_ownerId_resourceId: { clusterId, ownerId, resourceId },
			},
		});
		this.knownAmounts.set(key, current?.amount ?? 0);
	}

    private takePending(key: string): PendingDeduction | null {
        const lock = this.getLock(key);
        if (lock.timer) {
            clearTimeout(lock.timer);
            lock.timer = null;
        }
        const pending = lock.pending;
        lock.pending = null;
        return pending;
    }

    private enqueue(key: string, work: () => Promise<void>): Promise<void> {
        const lock = this.getLock(key);
        const run = lock.tail.then(work, work);
        lock.tail = run.then(
            () => undefined,
            () => undefined,
        );
        return run;
    }

    private getLock(key: string): ResourceLock {
        let lock = this.locks.get(key);
        if (!lock) {
            lock = { tail: Promise.resolve(), pending: null, timer: null };
            this.locks.set(key, lock);
        }
        return lock;
    }

    private resourceKey(
        clusterId: string,
        ownerId: number,
        resourceId: string,
    ): string {
        return `${clusterId}:${ownerId}:${resourceId}`;
    }

    private insufficientResources(): Error {
        return new Error("Insufficient resources");
    }

    private emitInventoryUpdate(clusterId: string, storage: StorageDto): void {
        this.eventEmitter.emit("inventory.updated", clusterId, storage);
    }
}