"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWsAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_ws_1 = require("@nestjs/platform-ws");
let CustomWsAdapter = class CustomWsAdapter extends platform_ws_1.WsAdapter {
    create(port, options = {}) {
        const server = super.create(port, options);
        server.on("connection", (ws, request) => {
            ws.upgradeHeaders = request.headers;
        });
        return server;
    }
};
exports.CustomWsAdapter = CustomWsAdapter;
exports.CustomWsAdapter = CustomWsAdapter = __decorate([
    (0, common_1.Injectable)()
], CustomWsAdapter);
//# sourceMappingURL=custom-ws-adapter.service.js.map