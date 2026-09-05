import { DatabaseService } from "../../database/service/database.service";
import { AppConfigDto } from "../../config/dto/app-config.dto";
export declare class DupeDetectionService {
    private readonly databaseService;
    private readonly config;
    private readonly logger;
    private readonly retentionDays;
    constructor(databaseService: DatabaseService, config: AppConfigDto);
    checkForSuspiciousBursts(): Promise<void>;
    pruneOldAuditLogs(): Promise<void>;
    private notifyDiscord;
}
