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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/service/database.service");
const crypto_1 = require("crypto");
const cluster_dto_1 = require("../dto/cluster.dto");
const config_constants_1 = require("../../config/config.constants");
const app_config_dto_1 = require("../../config/dto/app-config.dto");
let AuthService = AuthService_1 = class AuthService {
    constructor(databaseService, config) {
        this.databaseService = databaseService;
        this.config = config;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async onModuleInit() {
        const registerClusters = this.config.Auth.RegisterClusters;
        if (registerClusters?.length) {
            await this.registerClusters(registerClusters);
        }
    }
    async registerClusters(clusters) {
        for (const { ClusterId: id, Secret: secret } of clusters) {
            this.logger.log(`Registering cluster ${id} from configuration`);
            await this.databaseService.cluster.upsert({
                where: { id },
                update: { secret },
                create: { id, secret },
            });
        }
    }
    async register(id) {
        if (!this.config.Auth.AllowClusterRegistration) {
            throw new common_1.BadRequestException("Registration is disabled");
        }
        const existingCluster = await this.databaseService.cluster.findFirst({
            where: { id },
        });
        if (existingCluster) {
            throw new common_1.ConflictException("Cluster already exists");
        }
        const secret = (0, crypto_1.randomBytes)(50).toString("hex");
        const cluster = await this.databaseService.cluster.create({
            data: { id, secret },
        });
        return cluster_dto_1.ClusterDto.fromDatabase(cluster);
    }
    async login(id, secret) {
        const cluster = await this.databaseService.cluster.findFirst({
            where: { id },
        });
        if (!cluster) {
            throw new common_1.UnauthorizedException("Cluster not found");
        }
        if (cluster.secret !== secret) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        return cluster_dto_1.ClusterDto.fromDatabase(cluster);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        app_config_dto_1.AppConfigDto])
], AuthService);
//# sourceMappingURL=auth.service.js.map