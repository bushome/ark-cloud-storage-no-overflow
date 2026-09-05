import { Type } from 'class-transformer';
import { IsBoolean, ValidateIf, ValidateNested } from 'class-validator';
import { AuditLogConfigDto } from './audit-log-config.dto';
import { AuthConfigDto } from './auth-config.dto';
import { InventoryConfigDto } from './inventory-config.dto';
import { LoggingConfigDto } from './logging-config.dto';
import { MySqlConfigDto } from './mysql-config.dto';
import { ServerConfigDto } from './server-config.dto';
import { SQLiteConfigDto } from './sqlite-config.dto';

/**
 * Mirrors config.json exactly (PascalCase keys, per the finalized schema in
 * CLAUDE.md). A missing config.json is not an error — every field below has
 * a default, so `new AppConfigDto()` alone reproduces the documented
 * zero-config solo-player defaults (SQLite, port 3000,
 * AllowClusterRegistration: true).
 */
export class AppConfigDto {
  @IsBoolean()
  UseMySQL: boolean = false;

  // Only validated (Host/User/Password/Database required, etc.) when
  // UseMySQL is true — this is the literal @ValidateIf(o => o.UseMySQL)
  // called for in CLAUDE.md's validation plan. On SQLite, whatever is (or
  // isn't) in this block is never read.
  @ValidateIf((o: AppConfigDto) => o.UseMySQL)
  @ValidateNested()
  @Type(() => MySqlConfigDto)
  MySQL: MySqlConfigDto = new MySqlConfigDto();

  @ValidateNested()
  @Type(() => SQLiteConfigDto)
  SQLite: SQLiteConfigDto = new SQLiteConfigDto();

  @ValidateNested()
  @Type(() => ServerConfigDto)
  Server: ServerConfigDto = new ServerConfigDto();

  @ValidateNested()
  @Type(() => AuthConfigDto)
  Auth: AuthConfigDto = new AuthConfigDto();

  @ValidateNested()
  @Type(() => InventoryConfigDto)
  Inventory: InventoryConfigDto = new InventoryConfigDto();

  @ValidateNested()
  @Type(() => AuditLogConfigDto)
  AuditLog: AuditLogConfigDto = new AuditLogConfigDto();

  @ValidateNested()
  @Type(() => LoggingConfigDto)
  Logging: LoggingConfigDto = new LoggingConfigDto();
}
