import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { StorageDto } from "../dto/storage.dto";
import { InventoryService } from "../service/inventory.service";
import { WebSocket } from "ws";
export declare class InventoryGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly inventoryService;
    private readonly logger;
    private readonly clients;
    private readonly clientClusters;
    constructor(inventoryService: InventoryService);
    handleConnection(): Promise<void>;
    handleDisconnect(client: WebSocket): Promise<void>;
    subscribe(clusterId: string, socket: WebSocket): Promise<void>;
    unsubscribe(clusterId: string, socket: WebSocket): Promise<void>;
    updateInventory(clusterId: string, socket: WebSocket, storage: StorageDto): Promise<void>;
    handleInventoryUpdate(clusterId: string, storage: StorageDto): Promise<void>;
    private sendInventoryUpdate;
    private sendError;
    private sendEvent;
}
