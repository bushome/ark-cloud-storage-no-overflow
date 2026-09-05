import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from "@nestjs/websockets";
import { Logger, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ClusterId } from "../../auth/decorator/cluster-id.decorator";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { StorageDto } from "../dto/storage.dto";
import { InventoryService } from "../service/inventory.service";
import { WebSocket } from "ws";
import { OnEvent } from "@nestjs/event-emitter";

/**
 * The inventory gateway that handles inventory updates
 */
@WebSocketGateway({ path: "/inventory" })
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard)
export class InventoryGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    /**
     * The logger instance used to log messages
     * @private
     */
    private readonly logger = new Logger(InventoryGateway.name);
    /**
     * The set of clients subscribed to each cluster
     * @private
     */
    private readonly clients = new Map<string, Set<WebSocket>>();
    /**
     * The mapping of clients to the cluster they are subscribed to
     * @private
     */
    private readonly clientClusters = new Map<WebSocket, string>();
    /**
     * Initializes the inventory gateway
     * @param inventoryService The inventory service
     */
    public constructor(private readonly inventoryService: InventoryService) {}
    /**
     * Handles a new client connection
     */
    public async handleConnection(): Promise<void> {
        // Connection lifecycle noise — demoted to debug. This fires once per
        // socket (each ARK server maintains its own persistent connection),
        // so on a large cluster this is routine, not noteworthy at `log` level.
        this.logger.debug("Client connected");
    }
    /**
     * Handles a client disconnect
     * Unsubscribes the client from the cluster it was subscribed to
     * @param client The client that disconnected
     */
    public async handleDisconnect(client: WebSocket): Promise<void> {
        this.logger.debug("Client disconnected");
	 // unsubscribe the client from the cluster it was subscribed to
        const clusterId = this.clientClusters.get(client);
        if (clusterId) {
            await this.unsubscribe(clusterId, client);
        }
    }
    /**
     * Subscribes the client to the specified cluster
     * @param clusterId The ID of the cluster to subscribe to
     * @param socket The client socket
     */
    @SubscribeMessage("subscribe")
    public async subscribe(
        @ClusterId() clusterId: string,
        @ConnectedSocket() socket: WebSocket,
    ): Promise<void> {
        this.logger.debug(`Subscribing client to cluster ${clusterId}`);
		// add the socket to the set of clients
        const sockets = this.clients.get(clusterId) ?? new Set<WebSocket>();
        sockets.add(socket);
        this.clients.set(clusterId, sockets);
        this.clientClusters.set(socket, clusterId);
	    // emit the current inventory						 
        const inventory = await this.inventoryService.getInventory(clusterId);
        for (const storage of inventory) {
            this.sendInventoryUpdate(socket, storage);
        }
    }
    /**
     * Unsubscribes the client from the specified cluster
     * @param clusterId The ID of the cluster to unsubscribe from
     * @param socket The client socket
     */
    @SubscribeMessage("unsubscribe")
    public async unsubscribe(
        @ClusterId() clusterId: string,
        @ConnectedSocket() socket: WebSocket,
    ): Promise<void> {
        this.logger.debug(`Unsubscribing client from cluster ${clusterId}`);
		// remove the socket from the set of clients											
        const sockets = this.clients.get(clusterId);
        sockets?.delete(socket);
        if (sockets && sockets.size === 0) {
            this.clients.delete(clusterId);
        }
        this.clientClusters.delete(socket);
    }
    /**
     * Updates the inventory for the specified cluster.
     * Failures are returned only to the requesting socket so a crafting
     * station running dry cannot stall dedicated storage boxes.
     */
    @SubscribeMessage("update")
    public async updateInventory(
        @ClusterId() clusterId: string,
        @ConnectedSocket() socket: WebSocket,
        @MessageBody() storage: StorageDto,
    ): Promise<void> {
        try {
            await this.inventoryService.updateInventory(clusterId, storage);
        } catch (e) {
            this.sendError(
                socket,
                e instanceof Error ? e.message : String(e),
            );
        }
    }
    /**
     * Handles an inventory update event
     * @param clusterId The ID of the cluster
     * @param storage The updated storage
     */
    @OnEvent("inventory.updated")
    public async handleInventoryUpdate(
        clusterId: string,
        storage: StorageDto,
    ): Promise<void> {
		// send the inventory update to all clients subscribed to the cluster														 
        const sockets = this.clients.get(clusterId);
        if (sockets) {
            // Fires on every deposit AND every deduction batch flush — the
            // highest-volume log line in the app under crafting load, and it
            // carries no detail beyond a socket count (no resource, no
            // amount). Actual deduction specifics live in DeductionAuditLog;
            // actual deposit specifics are logged separately in
            // InventoryService at `log` level. Demoted to debug so a normal
            // terminal session isn't dominated by fan-out bookkeeping.
            this.logger.debug(
                `Sending inventory update for cluster ${clusterId} to ${sockets.size} subscribed clients`,
            );
            for (const subscribed of sockets) {
                this.sendInventoryUpdate(subscribed, storage);
            }
        }
    }
    /**
     * Sends an inventory update to the client
     * @param socket The client socket
     * @param storage The updated storage
     * @private
     */
    private sendInventoryUpdate(socket: WebSocket, storage: StorageDto): void {
        this.sendEvent(socket, "update", storage);
    }
    private sendError(socket: WebSocket, message: string): void {
        this.sendEvent(socket, "error", { message });
    }
    private sendEvent(
        socket: WebSocket,
        event: string,
        data: unknown,
    ): void {
        if (socket.readyState !== WebSocket.OPEN) {
            return;
        }
        socket.send(JSON.stringify({ event, data }));
    }
}