import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
// These come from the TWO generated clients (see prisma/schema.mysql.prisma
// and prisma/schema.sqlite.prisma) — NOT two imports of the same client.
// Prisma ties a generated client to a single datasource `provider`, so one
// PrismaClient class cannot be pointed at either database at runtime; see
// the "Two-schema requirement" note in the accompanying README section.
import type { PrismaClient as MySqlPrismaClient } from '../../../generated/mysql-client';
import { PrismaClient as SqlitePrismaClient } from '../../../generated/sqlite-client';
import { APP_CONFIG } from '../../config/config.constants';
import { AppConfigDto } from '../../config/dto/app-config.dto';
import { ensureSqliteResilience, resolveSqliteFsPath } from '../util/sqlite-resilience.util';

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

/**
 * Inlined rather than shipped as a separate .sql file — this avoids a
 * manual copy-step across every deployment shape (clouddb, Deployables/
 * NodeJS, the Go-launcher's embedded payload). Generated via
 * `npx prisma migrate diff --from-empty --to-schema-datamodel
 * prisma/schema.sqlite.prisma --script` — regenerate the same way if
 * schema.sqlite.prisma's Cluster/DedicatedStorage models ever change.
 * Deliberately excludes DeductionAuditLog/ResourceRateCeiling — the
 * dupe-detection audit system has no purpose in a solo-player context
 * (no adversarial multi-player scenario to detect), and
 * InventoryService's logDeduction is already gated behind
 * config.UseMySQL so it never attempts to write to a table that
 * doesn't exist here.
 */
const SQLITE_INITIAL_SCHEMA_STATEMENTS = [
  `CREATE TABLE "Cluster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "secret" TEXT NOT NULL
);`,
  `CREATE TABLE "DedicatedStorage" (
    "resourceId" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    PRIMARY KEY ("clusterId", "ownerId", "resourceId")
);`,
];

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private readonly client: AnyPrismaClient;
  private readonly isMySql: boolean;
  // Only meaningful when !isMySql — resolved once in the constructor since
  // it's needed both for the boot-time resilience check in onModuleInit
  // and (indirectly, via buildSqliteClient) for the adapter's own URL.
  private readonly sqliteFsPath: string | null;

  constructor(@Inject(APP_CONFIG) config: AppConfigDto) {
    this.isMySql = config.UseMySQL;
    this.sqliteFsPath = this.isMySql ? null : resolveSqliteFsPath(config.SQLite.File);

    this.client = this.isMySql
      ? DatabaseService.buildMySqlClient(config)
      : DatabaseService.buildSqliteClient(config, this.sqliteFsPath!);

    this.logger.log(
      this.isMySql
        ? `Database: MySQL/MariaDB at ${config.MySQL.Host}:${config.MySQL.Port}/${config.MySQL.Database}`
        : `Database: SQLite (libSQL) at ${this.sqliteFsPath}`,
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
    // Lazily required — only ever reached when config.UseMySQL is true.
    // Keeps @prisma/adapter-mariadb and generated/mysql-client's runtime
    // code out of the load path entirely for SQLite-only deployment
    // trees (e.g. the Go-launcher build) that never install that adapter
    // at all. MySqlPrismaClient is still imported as a type above (import
    // type, erased at compile time) purely for the declaration-merging
    // interface and the AnyPrismaClient union — that only needs
    // generated/mysql-client's .d.ts files to exist at build time, not
    // its runtime code to exist at execution time.
    const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
    const { PrismaClient: MySqlPrismaClientRuntime } = require('../../../generated/mysql-client');
     const adapter = new PrismaMariaDb({
       host: config.MySQL.Host,
       port: config.MySQL.Port,
       user: config.MySQL.User,
       password: config.MySQL.Password,
       database: config.MySQL.Database,
       ...(config.MySQL.ConnectionLimit != null
         ? { connectionLimit: config.MySQL.ConnectionLimit }
         : {}),
     });

    return new MySqlPrismaClientRuntime({ adapter });
   }

  /**
   * Migrated from @prisma/adapter-better-sqlite3 to @prisma/adapter-libsql
   * (2026-09-05). better-sqlite3 uses Node's legacy node::ObjectWrap C++
   * pattern, which sits outside Node's stable-ABI (N-API) guarantee, and
   * was the confirmed root cause of a recurring native crash
   * (RemoveEnvironmentCleanupHook assertion failure, code 134) that
   * survived four independent, disprovable mitigation attempts: pinning to
   * a pre-regression Node version, changing the backup mechanism, removing
   * every line of this session's resilience code entirely, and rebuilding
   * the native binary against the exact runtime that loads it. All four
   * failed to change the outcome. libSQL's Node bindings are built via
   * napi-rs — proper N-API — which structurally avoids this bug class
   * rather than working around one specific symptom of it.
   *
   * Behavioral note: unlike better-sqlite3 (which opened the database file
   * synchronously the instant `new Database(path)` was called),
   * PrismaLibSQL/@libsql/client is lazy and does not touch the file here at
   * all. This is what allows the boot-time integrity check to live in
   * onModuleInit() now (see below) instead of needing to run inside this
   * constructor to beat Nest's OnModuleInit ordering, which the previous
   * better-sqlite3-based version required.
   */
  private static buildSqliteClient(config: AppConfigDto, fsPath: string): SqlitePrismaClient {
    const configured = config.SQLite.File;
    // A user-supplied `file:` URL is passed through unchanged; a bare path
    // (the common case, including the default) gets the app-root-resolved
    // fsPath re-prefixed.
    const url = configured.startsWith('file:') ? configured : `file:${fsPath}`;
    const adapter = new PrismaLibSQL({ url });
    return new SqlitePrismaClient({ adapter });
  }

  /**
   * A freshly-created SQLite file has no tables at all — nothing applies
   * the schema automatically (unlike MySQL, where an operator runs
   * migration.sql by hand against an already-provisioned server before
   * first boot). Checks sqlite_master directly for the Cluster table
   * rather than relying on a specific Prisma error code, so this stays
   * correct even if Prisma's error surface changes across versions. Runs
   * the inlined DDL as a single executeRawUnsafe call per statement if the
   * table is missing; a no-op on every subsequent boot once the schema
   * exists.
   */
  private async ensureSqliteSchema(): Promise<void> {
    const client = this.client as SqlitePrismaClient;
    const existing = await client.$queryRawUnsafe<{ name: string }[]>(
      `SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Cluster'`,
    );
    if (existing.length > 0) {
      return;
    }
    this.logger.log('SQLite database is uninitialized — applying initial schema.');
    for (const statement of SQLITE_INITIAL_SCHEMA_STATEMENTS) {
      await client.$executeRawUnsafe(statement);
    }
  }

  async onModuleInit(): Promise<void> {
    if (!this.isMySql) {
      // Must run BEFORE $connect() below — a corrupted file must never be
      // the one Prisma's own long-lived connection latches onto. See
      // ensureSqliteResilience's own comment (sqlite-resilience.util.ts)
      // for why this can safely live here, in onModuleInit, rather than
      // needing the constructor-level workaround the previous
      // better-sqlite3-based version required.
      await ensureSqliteResilience(this.sqliteFsPath!);
    }
    await this.client.$connect();
    if (!this.isMySql) {
      await this.ensureSqliteSchema();
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}
