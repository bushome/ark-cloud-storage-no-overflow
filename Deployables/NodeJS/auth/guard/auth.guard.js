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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../service/auth.service");
const core_1 = require("@nestjs/core");
const constants_1 = require("../constants");
const cluster_context_1 = require("../util/cluster-context");
let AuthGuard = class AuthGuard {
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const allowUnauthenticated = this.reflector.getAllAndOverride(constants_1.ALLOW_UNAUTHORIZED, [context.getHandler(), context.getClass()]);
        if (allowUnauthenticated) {
            return true;
        }
        let id;
        let secret;
        switch (context.getType()) {
            case "http": {
                const httpRequest = context.switchToHttp().getRequest();
                id = httpRequest.headers["x-cluster-id"];
                secret = httpRequest.headers["x-cluster-secret"];
                break;
            }
            case "ws": {
                const wsRequest = context.switchToWs().getClient();
                id = wsRequest.upgradeHeaders["x-cluster-id"];
                secret = wsRequest.upgradeHeaders["x-cluster-secret"];
                break;
            }
            default:
                throw new Error("Invalid context type");
        }
        if (!id || !secret) {
            throw new common_1.UnauthorizedException();
        }
        await this.authService.login(id, secret);
        (0, cluster_context_1.setClusterId)(context, id);
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map