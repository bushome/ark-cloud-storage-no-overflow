import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
// These come from the TWO generated clients (see prisma/schema.mysql.prisma
// and prisma/schema.sqlite.prisma) — NOT two imports of the same client.
// Prisma ties a generated client to a single datasource `provider`, so one
// PrismaClient class cannot be pointed at either database at runtime; see
// the "Two-schema requirement" note in the accompanying README section.
import { PrismaClient as MySqlPrismaClient } from '../../../generated/mysql-client';
import { PrismaClient as SqlitePrismaClient } from '../../../generated/sqlite-client';
import { APP_CONFIG } from '../../config/config.constants';
import { resolveAppPath } from '../../config/app-root';
import { AppConfigDto } from '../../config/dto/app-config.dto';

type AnyPrismaClient = MySqlPrismaClient | SqlitePrismaClient;

/**
 * Declaration merging: this gives DatabaseService the full PrismaClient
 * surface (dedicatedStorage, deductionAuditLog, $transaction, $connect, ...)
 * for editor autocomplete and type-checking at every existing call site,
 * even though DatabaseService can no longer literally `extends PrismaClient`
 * (there are two different PrismaClient classes now, chosen at runtime).
 * MySqlPrismaClient is used as the reference shape purely for typing;
 * because schema.mysql.prisma and schema.sqlite.prisma declare the same
 * models, the two generated clients are structurally interchangeable for
 * every query this project makes.
 */
export interface DatabaseService extends MySqlPrismaClient {}

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly client: AnyPrismaClient;

  constructor(@Inject(APP_CONFIG) config: AppConfigDto) {
    this.client = config.UseMySQL
      ? DatabaseService.buildMySqlClient(config)
      : DatabaseService.buildSqliteClient(config);

    this.logger.log(
      config.UseMySQL
        ? `Database: MySQL/MariaDB at ${config.MySQL.Host}:${config.MySQL.Port}/${config.MySQL.Database}`
        : `Database: SQLite at ${DatabaseService.resolveSqliteFsPath(config.SQLite.File)}`,
    );

    // Forward anything not defined directly on this class (i.e. every
    // Prisma-generated member: model delegates, $transaction, $connect,
    // $disconnect, $on, ...) straight through to whichever concrete client
    // was just constructed above. This is what lets DatabaseService keep
    // behaving exactly like "extends PrismaClient" for every existing call
    // site (inventory.service.ts, dupe-detection.service.ts, etc.) without
    // touching those files.
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        const value = Reflect.get(target.client as object, prop);
        return typeof value === 'function' ? value.bind(target.client) : value;
      },
    }) as unknown as DatabaseService;
  }

  private static buildMySqlClient(config: AppConfigDto): MySqlPrismaClient {
    const adapter = new PrismaMariaDb({
      host: config.MySQL.Host,
      port: config.MySQL.Port,
      user: config.MySQL.User,
      password: config.MySQL.Password,
      database: config.MySQL.Database,
      // Only included when explicitly set — see MySqlConfigDto for why this
      // isn't defaulted to a hardcoded number.
      ...(config.MySQL.ConnectionLimit != null
        ? { connectionLimit: config.MySQL.ConnectionLimit }
        : {}),
    });
    return new MySqlPrismaClient({ adapter });
  }

  /**
   * Strips a leading `file:` prefix (already-fully-resolved case) or
   * anchors a bare path to the app's own directory rather than cwd — see
   * app-root.ts. Shared between buildSqliteClient and the startup log line
   * so both report the same, actual, resolved filesystem path.
   */
  private static resolveSqliteFsPath(configured: string): string {
    return configured.startsWith('file:') ? configured.slice('file:'.length) : resolveAppPath(configured);
  }

  private static buildSqliteClient(config: AppConfigDto): SqlitePrismaClient {
    const configured = config.SQLite.File;
    const fsPath = DatabaseService.resolveSqliteFsPath(configured);
    // A user-supplied `file:` URL is passed through unchanged; a bare path
    // (the common case, including the default) gets the app-root-resolved
    // fsPath re-prefixed.
    const url = configured.startsWith('file:') ? configured : `file:${fsPath}`;

    // better-sqlite3 will not create missing parent directories on its own.
    mkdirSync(dirname(fsPath), { recursive: true });
    const adapter = new PrismaBetterSQLite3({ url });
    return new SqlitePrismaClient({ adapter });
  }

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}