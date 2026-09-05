import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient as MySqlPrismaClient } from '../../../generated/mysql-client';
import { AppConfigDto } from '../../config/dto/app-config.dto';
export interface DatabaseService extends MySqlPrismaClient {
}
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private readonly client;
    constructor(config: AppConfigDto);
    private static buildMySqlClient;
    private static resolveSqliteFsPath;
    private static buildSqliteClient;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
