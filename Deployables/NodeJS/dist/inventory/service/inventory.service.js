"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var InventoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const database_service_1 = require("../../database/service/database.service");
const dedicated_storage_dto_1 = require("../dto/dedicated-storage.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_constants_1 = require("../../config/config.constants");
const app_config_dto_1 = require("../../config/dto/app-config.dto");
let InventoryService = InventoryService_1 = class InventoryService {
    constructor(databaseService, eventEmitter, config) {
        this.databaseService = databaseService;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(InventoryService_1.name);
        this.knownAmounts = new Map();
        this.locks = new Map();
        this.batchWindowMs = Number(process.env.INVENTORY_BATCH_WINDOW_MS) || 100;
        this.auditLoggingEnabled = config.UseMySQL;
    }
    async getInventory(clusterId) {
        const storage = [];
        const dedicatedStorage = await this.databaseService.dedicatedStorage.findMany({
            where: { clusterId },
        });
        for (const storageItem of dedicatedStorage) {
            storage.push(dedicated_storage_dto_1.DedicatedStorageDto.fromDatabase(storageItem));
            const key = this.resourceKey(storageItem.clusterId, storageItem.ownerId, storageItem.resourceId);
            this.knownAmounts.set(key, storageItem.amount);
        }
        return storage;
    }
    async updateInventory(clusterId, storage) {
        switch (storage.type) {
            case "dedicated":
                await this.setDedicatedStorage(clusterId, storage);
                break;
            default:
                throw new common_1.BadRequestException("Invalid storage type");
        }
    }
    async setDedicatedStorage(clusterId, storage) {
        const key = this.resourceKey(clusterId, storage.ownerId, storage.resourceId);
        if (storage.amount >= 0) {
            this.flushPendingNow(key);
            await this.enqueue(key, () => this.applyDeposit(key, clusterId, storage));
            return;
        }
        await this.enqueueDeduction(key, clusterId, storage);
    }
    async applyDeposit(key, clusterId, storage) {
        this.logger.log(`Adding ${storage.amount} ${storage.resourceId} for cluster ${clusterId} owner ${storage.ownerId}`);
        const updateStorage = await this.databaseService.dedicatedStorage.upsert({
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
        this.emitInventoryUpdate(clusterId, dedicated_storage_dto_1.DedicatedStorageDto.fromDatabase(updateStorage));
    }
    enqueueDeduction(key, clusterId, storage) {
        const cost = Math.abs(storage.amount);
        const cached = this.knownAmounts.get(key);
        if (cached !== undefined && cached < cost) {
            return Promise.reject(this.insufficientResources());
        }
        const lock = this.getLock(key);
        if (lock.pending &&
            cached !== undefined &&
            lock.pending.totalCost + cost > cached) {
            this.flushPendingNow(key);
        }
        return new Promise((resolve, reject) => {
            this.startOrJoinBatch(key, clusterId, storage.ownerId, storage.resourceId, cost, resolve, reject);
        });
    }
    startOrJoinBatch(key, clusterId, ownerId, resourceId, cost, resolve, reject) {
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
            }, this.batchWindowMs);
        }
        lock.pending.totalCost += cost;
        lock.pending.waiters.push({ resolve, reject });
    }
    flushPendingNow(key) {
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
            }
            catch (error) {
                for (const waiter of pending.waiters) {
                    waiter.reject(error);
                }
            }
        });
    }
    async applyDeduction(key, pending) {
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
        this.emitInventoryUpdate(clusterId, dedicated_storage_dto_1.DedicatedStorageDto.fromDatabase(row));
    }
    logDeduction(clusterId, ownerId, resourceId, totalCost, succeeded, balanceAtEvent) {
        if (!this.auditLoggingEnabled) {
            return Promise.resolve();
        }
        return this.databaseService.deductionAuditLog
            .create({ data: { clusterId, ownerId, resourceId, totalCost, succeeded, balanceAtEvent } })
            .then(() => undefined)
            .catch((err) => {
            this.logger.warn(`Failed to write audit log: ${err}`);
        });
    }
    async resyncCache(key, clusterId, ownerId, resourceId) {
        const current = await this.databaseService.dedicatedStorage.findUnique({
            where: {
                clusterId_ownerId_resourceId: { clusterId, ownerId, resourceId },
            },
        });
        this.knownAmounts.set(key, current?.amount ?? 0);
    }
    takePending(key) {
        const lock = this.getLock(key);
        if (lock.timer) {
            clearTimeout(lock.timer);
            lock.timer = null;
        }
        const pending = lock.pending;
        lock.pending = null;
        return pending;
    }
    enqueue(key, work) {
        const lock = this.getLock(key);
        const run = lock.tail.then(work, work);
        lock.tail = run.then(() => undefined, () => undefined);
        return run;
    }
    getLock(key) {
        let lock = this.locks.get(key);
        if (!lock) {
            lock = { tail: Promise.resolve(), pending: null, timer: null };
            this.locks.set(key, lock);
        }
        return lock;
    }
    resourceKey(clusterId, ownerId, resourceId) {
        return `${clusterId}:${ownerId}:${resourceId}`;
    }
    insufficientResources() {
        return new Error("Insufficient resources");
    }
    emitInventoryUpdate(clusterId, storage) {
        this.eventEmitter.emit("inventory.updated", clusterId, storage);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = InventoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_2.Inject)(config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        event_emitter_1.EventEmitter2,
        app_config_dto_1.AppConfigDto])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map