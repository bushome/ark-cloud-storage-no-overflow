import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { DatabaseService } from "../../database/service/database.service";
import { APP_CONFIG } from "../../config/config.constants";
import { AppConfigDto } from "../../config/dto/app-config.dto";

type SuspiciousBurst = {
    ownerId: number;
    resourceId: string;
    clusterId: string;
    eventCount: bigint;
    totalConsumed: bigint;
    windowStart: Date;
    windowEnd: Date;
    maxLegitRatePerSec: number;
};

@Injectable()
export class DupeDetectionService {
    private readonly logger = new Logger(DupeDetectionService.name);
    private readonly retentionDays: number;

    public constructor(
        private readonly databaseService: DatabaseService,
        @Inject(APP_CONFIG) private readonly config: AppConfigDto,
    ) {
        this.retentionDays = this.config.AuditLog.RetentionDays;
    }

@Cron(CronExpression.EVERY_5_MINUTES)
public async checkForSuspiciousBursts(): Promise<void> {
    // Dupe-burst detection distinguishes one player's legitimate multi-station
    // crafting from multiple concurrent stations exploiting the engine race —
    // meaningless on the solo-player/SQLite target, where there's no second
    // party to distinguish from. The underlying view/query is MySQL-dialect
    // only and has no SQLite equivalent by design.
    if (!this.config.UseMySQL) {
        this.logger.debug("Skipping burst detection — SQLite backend has no multi-player concurrency to detect");
        return;
    }
    const results = await this.databaseService.$queryRaw<SuspiciousBurst[]>`
        SELECT * FROM SuspiciousDeductionBursts
        WHERE windowEnd > NOW() - INTERVAL 6 MINUTE
    `;
    if (results.length === 0) {
        return;
    }
    this.logger.warn(`Found ${results.length} suspicious deduction burst(s)`);
    for (const burst of results) {
        const rate = Number(burst.totalConsumed) / 10;
        const message =
            `Owner ${burst.ownerId} on cluster ${burst.clusterId}: ` +
            `${burst.eventCount} withdrawals of ${burst.resourceId} totaling ${burst.totalConsumed} ` +
            `between ${burst.windowStart.toISOString()} and ${burst.windowEnd.toISOString()} ` +
            `(~${rate.toFixed(1)}/sec vs. ceiling of ${burst.maxLegitRatePerSec}/sec)`;
        this.logger.warn(message);
        await this.notifyDiscord(message);
    }
}

    // Prunes the deduction log at a given interval to avoid bloat
    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    public async pruneOldAuditLogs(): Promise<void> {
        const cutoff = new Date(Date.now() - 1000 * 60 * 60 * 24 * this.retentionDays);
        const result = await this.databaseService.deductionAuditLog.deleteMany({
            where: { createdAt: { lt: cutoff } },
        });
        if (result.count > 0) {
            this.logger.log(`Pruned ${result.count} audit log entries older than ${this.retentionDays} days`);
        }
    }

    private async notifyDiscord(message: string): Promise<void> {
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
        } catch (err) {
            this.logger.warn(`Failed to post Discord alert: ${err}`);
        }
    }
}