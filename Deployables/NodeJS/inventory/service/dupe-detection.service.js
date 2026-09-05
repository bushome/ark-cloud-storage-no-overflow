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
var DupeDetectionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DupeDetectionService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const database_service_1 = require("../../database/service/database.service");
const config_constants_1 = require("../../config/config.constants");
const app_config_dto_1 = require("../../config/dto/app-config.dto");
let DupeDetectionService = DupeDetectionService_1 = class DupeDetectionService {
    constructor(databaseService, config) {
        this.databaseService = databaseService;
        this.config = config;
        this.logger = new common_1.Logger(DupeDetectionService_1.name);
        this.retentionDays = this.config.AuditLog.RetentionDays;
    }
    async checkForSuspiciousBursts() {
        if (!this.config.UseMySQL) {
            this.logger.debug("Skipping burst detection — SQLite backend has no multi-player concurrency to detect");
            return;
        }
        const results = await this.databaseService.$queryRaw `
        SELECT * FROM SuspiciousDeductionBursts
        WHERE windowEnd > NOW() - INTERVAL 6 MINUTE
    `;
        if (results.length === 0) {
            return;
        }
        this.logger.warn(`Found ${results.length} suspicious deduction burst(s)`);
        for (const burst of results) {
            const rate = Number(burst.totalConsumed) / 10;
            const message = `Owner ${burst.ownerId} on cluster ${burst.clusterId}: ` +
                `${burst.eventCount} withdrawals of ${burst.resourceId} totaling ${burst.totalConsumed} ` +
                `between ${burst.windowStart.toISOString()} and ${burst.windowEnd.toISOString()} ` +
                `(~${rate.toFixed(1)}/sec vs. ceiling of ${burst.maxLegitRatePerSec}/sec)`;
            this.logger.warn(message);
            await this.notifyDiscord(message);
        }
    }
    async pruneOldAuditLogs() {
        const cutoff = new Date(Date.now() - 1000 * 60 * 60 * 24 * this.retentionDays);
        const result = await this.databaseService.deductionAuditLog.deleteMany({
            where: { createdAt: { lt: cutoff } },
        });
        if (result.count > 0) {
            this.logger.log(`Pruned ${result.count} audit log entries older than ${this.retentionDays} days`);
        }
    }
    async notifyDiscord(message) {
        const webhookUrl = this.config.AuditLog.DiscordWebhook;
        if (!webhookUrl) {
            return;
        }
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: `⚠️ **Possible dupe activity detected**\n${message}` }),
            });
        }
        catch (err) {
            this.logger.warn(`Failed to post Discord alert: ${err}`);
        }
    }
};
exports.DupeDetectionService = DupeDetectionService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DupeDetectionService.prototype, "checkForSuspiciousBursts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_3AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DupeDetectionService.prototype, "pruneOldAuditLogs", null);
exports.DupeDetectionService = DupeDetectionService = DupeDetectionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        app_config_dto_1.AppConfigDto])
], DupeDetectionService);
//# sourceMappingURL=dupe-detection.service.js.map