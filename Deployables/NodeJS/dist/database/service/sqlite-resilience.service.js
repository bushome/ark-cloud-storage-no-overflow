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
var SqliteResilienceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteResilienceService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_constants_1 = require("../../config/config.constants");
const app_config_dto_1 = require("../../config/dto/app-config.dto");
const database_service_1 = require("./database.service");
const sqlite_resilience_util_1 = require("../util/sqlite-resilience.util");
let SqliteResilienceService = SqliteResilienceService_1 = class SqliteResilienceService {
    constructor(config, db) {
        this.db = db;
        this.logger = new common_1.Logger(SqliteResilienceService_1.name);
        this.enabled = !config.UseMySQL;
        this.fsPath = (0, sqlite_resilience_util_1.resolveSqliteFsPath)(config.SQLite.File);
    }
    async handleBackup() {
        if (!this.enabled) {
            return;
        }
        try {
            await (0, sqlite_resilience_util_1.createBackupIfNeeded)(this.db, this.fsPath);
        }
        catch (err) {
            this.logger.warn(`SQLite backup attempt failed: ${err}`);
        }
    }
};
exports.SqliteResilienceService = SqliteResilienceService;
__decorate([
    (0, schedule_1.Cron)('*/15 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SqliteResilienceService.prototype, "handleBackup", null);
exports.SqliteResilienceService = SqliteResilienceService = SqliteResilienceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [app_config_dto_1.AppConfigDto,
        database_service_1.DatabaseService])
], SqliteResilienceService);
//# sourceMappingURL=sqlite-resilience.service.js.map