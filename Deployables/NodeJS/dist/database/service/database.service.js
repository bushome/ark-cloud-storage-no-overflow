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
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const mysql_client_1 = require("../../../generated/mysql-client");
const sqlite_client_1 = require("../../../generated/sqlite-client");
const config_constants_1 = require("../../config/config.constants");
const app_root_1 = require("../../config/app-root");
const app_config_dto_1 = require("../../config/dto/app-config.dto");
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
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor(config) {
        this.logger = new common_1.Logger(DatabaseService_1.name);
        this.isMySql = config.UseMySQL;
        this.client = this.isMySql
            ? DatabaseService_1.buildMySqlClient(config)
            : DatabaseService_1.buildSqliteClient(config);
        this.logger.log(this.isMySql
            ? `Database: MySQL/MariaDB at ${config.MySQL.Host}:${config.MySQL.Port}/${config.MySQL.Database}`
            : `Database: SQLite at ${DatabaseService_1.resolveSqliteFsPath(config.SQLite.File)}`);
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) {
                    return Reflect.get(target, prop, receiver);
                }
                const value = Reflect.get(target.client, prop);
                return typeof value === 'function' ? value.bind(target.client) : value;
            },
        });
    }
    static buildMySqlClient(config) {
        const adapter = new adapter_mariadb_1.PrismaMariaDb({
            host: config.MySQL.Host,
            port: config.MySQL.Port,
            user: config.MySQL.User,
            password: config.MySQL.Password,
            database: config.MySQL.Database,
            ...(config.MySQL.ConnectionLimit != null
                ? { connectionLimit: config.MySQL.ConnectionLimit }
                : {}),
        });
        return new mysql_client_1.PrismaClient({ adapter });
    }
    static resolveSqliteFsPath(configured) {
        return configured.startsWith('file:') ? configured.slice('file:'.length) : (0, app_root_1.resolveAppPath)(configured);
    }
    static buildSqliteClient(config) {
        const configured = config.SQLite.File;
        const fsPath = DatabaseService_1.resolveSqliteFsPath(configured);
        const url = configured.startsWith('file:') ? configured : `file:${fsPath}`;
        (0, fs_1.mkdirSync)((0, path_1.dirname)(fsPath), { recursive: true });
        const adapter = new adapter_better_sqlite3_1.PrismaBetterSQLite3({ url });
        return new sqlite_client_1.PrismaClient({ adapter });
    }
    async ensureSqliteSchema() {
        const client = this.client;
        const existing = await client.$queryRawUnsafe(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'Cluster'`);
        if (existing.length > 0) {
            return;
        }
        this.logger.log('SQLite database is uninitialized — applying initial schema.');
        for (const statement of SQLITE_INITIAL_SCHEMA_STATEMENTS) {
            await client.$executeRawUnsafe(statement);
        }
    }
    async onModuleInit() {
        await this.client.$connect();
        if (!this.isMySql) {
            await this.ensureSqliteSchema();
        }
    }
    async onModuleDestroy() {
        await this.client.$disconnect();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_constants_1.APP_CONFIG)),
    __metadata("design:paramtypes", [app_config_dto_1.AppConfigDto])
], DatabaseService);
//# sourceMappingURL=database.service.js.map