import { AppConfigDto } from '../../config/dto/app-config.dto';
import { DatabaseService } from './database.service';
export declare class SqliteResilienceService {
    private readonly db;
    private readonly logger;
    private readonly enabled;
    private readonly fsPath;
    constructor(config: AppConfigDto, db: DatabaseService);
    handleBackup(): Promise<void>;
}
