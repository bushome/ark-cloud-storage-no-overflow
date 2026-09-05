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
var InventoryGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const cluster_id_decorator_1 = require("../../auth/decorator/cluster-id.decorator");
const auth_guard_1 = require("../../auth/guard/auth.guard");
const storage_dto_1 = require("../dto/storage.dto");
const inventory_service_1 = require("../service/inventory.service");
const ws_1 = require("ws");
const event_emitter_1 = require("@nestjs/event-emitter");
let InventoryGateway = InventoryGateway_1 = class InventoryGateway {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
        this.logger = new common_1.Logger(InventoryGateway_1.name);
        this.clients = new Map();
        this.clientClusters = new Map();
    }
    async handleConnection() {
        this.logger.debug("Client connected");
    }
    async handleDisconnect(client) {
        this.logger.debug("Client disconnected");
        const clusterId = this.clientClusters.get(client);
        if (clusterId) {
            await this.unsubscribe(clusterId, client);
        }
    }
    async subscribe(clusterId, socket) {
        this.logger.debug(`Subscribing client to cluster ${clusterId}`);
        const sockets = this.clients.get(clusterId) ?? new Set();
        sockets.add(socket);
        this.clients.set(clusterId, sockets);
        this.clientClusters.set(socket, clusterId);
        const inventory = await this.inventoryService.getInventory(clusterId);
        for (const storage of inventory) {
            this.sendInventoryUpdate(socket, storage);
        }
    }
    async unsubscribe(clusterId, socket) {
        this.logger.debug(`Unsubscribing client from cluster ${clusterId}`);
        const sockets = this.clients.get(clusterId);
        sockets?.delete(socket);
        if (sockets && sockets.size === 0) {
            this.clients.delete(clusterId);
        }
        this.clientClusters.delete(socket);
    }
    async updateInventory(clusterId, socket, storage) {
        try {
            await this.inventoryService.updateInventory(clusterId, storage);
        }
        catch (e) {
            this.sendError(socket, e instanceof Error ? e.message : String(e));
        }
    }
    async handleInventoryUpdate(clusterId, storage) {
        const sockets = this.clients.get(clusterId);
        if (sockets) {
            this.logger.debug(`Sending inventory update for cluster ${clusterId} to ${sockets.size} subscribed clients`);
            for (const subscribed of sockets) {
                this.sendInventoryUpdate(subscribed, storage);
            }
        }
    }
    sendInventoryUpdate(socket, storage) {
        this.sendEvent(socket, "update", storage);
    }
    sendError(socket, message) {
        this.sendEvent(socket, "error", { message });
    }
    sendEvent(socket, event, data) {
        if (socket.readyState !== ws_1.WebSocket.OPEN) {
            return;
        }
        socket.send(JSON.stringify({ event, data }));
    }
};
exports.InventoryGateway = InventoryGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)("subscribe"),
    __param(0, (0, cluster_id_decorator_1.ClusterId)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ws_1.WebSocket]),
    __metadata("design:returntype", Promise)
], InventoryGateway.prototype, "subscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("unsubscribe"),
    __param(0, (0, cluster_id_decorator_1.ClusterId)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ws_1.WebSocket]),
    __metadata("design:returntype", Promise)
], InventoryGateway.prototype, "unsubscribe", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("update"),
    __param(0, (0, cluster_id_decorator_1.ClusterId)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ws_1.WebSocket,
        storage_dto_1.StorageDto]),
    __metadata("design:returntype", Promise)
], InventoryGateway.prototype, "updateInventory", null);
__decorate([
    (0, event_emitter_1.OnEvent)("inventory.updated"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, storage_dto_1.StorageDto]),
    __metadata("design:returntype", Promise)
], InventoryGateway.prototype, "handleInventoryUpdate", null);
exports.InventoryGateway = InventoryGateway = InventoryGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({ path: "/inventory" }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryGateway);
//# sourceMappingURL=inventory.gateway.js.map