import { DatabaseService } from '../database/service/database.service';
export declare class HealthController {
    private readonly db;
    constructor(db: DatabaseService);
    check(): Promise<{
        status: string;
        db: string;
        timestamp: string;
    }>;
}
