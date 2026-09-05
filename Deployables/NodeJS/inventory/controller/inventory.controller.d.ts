import { StorageDto } from "../dto/storage.dto";
import { InventoryService } from "../service/inventory.service";
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(clusterId: string): Promise<StorageDto[]>;
    updateInventory(clusterId: string, storage: StorageDto): Promise<void>;
}
