import { AuditLogConfigDto } from './audit-log-config.dto';
import { AuthConfigDto } from './auth-config.dto';
import { InventoryConfigDto } from './inventory-config.dto';
import { LoggingConfigDto } from './logging-config.dto';
import { MySqlConfigDto } from './mysql-config.dto';
import { ServerConfigDto } from './server-config.dto';
import { SQLiteConfigDto } from './sqlite-config.dto';
export declare class AppConfigDto {
    UseMySQL: boolean;
    MySQL: MySqlConfigDto;
    SQLite: SQLiteConfigDto;
    Server: ServerConfigDto;
    Auth: AuthConfigDto;
    Inventory: InventoryConfigDto;
    AuditLog: AuditLogConfigDto;
    Logging: LoggingConfigDto;
}
