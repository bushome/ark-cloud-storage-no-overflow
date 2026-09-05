import { DatabaseService } from "../../database/service/database.service";
import { StorageDto } from "../dto/storage.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class InventoryService {
    private readonly databaseService;
    private readonly eventEmitter;
    private readonly logger;
    private readonly knownAmounts;
    private readonly locks;
    private readonly batchWindowMs;
    constructor(databaseService: DatabaseService, eventEmitter: EventEmitter2);
    getInventory(clusterId: string): Promise<StorageDto[]>;
    updateInventory(clusterId: string, storage: StorageDto): Promise<void>;
    private setDedicatedStorage;
    private applyDeposit;
    private enqueueDeduction;
    private startOrJoinBatch;
    private flushPendingNow;
    private applyDeduction;
    private logDeduction;
    private resyncCache;
    private takePending;
    private enqueue;
    private getLock;
    private resourceKey;
    private insufficientResources;
    private emitInventoryUpdate;
}
