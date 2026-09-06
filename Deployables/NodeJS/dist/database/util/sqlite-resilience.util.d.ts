export declare function resolveSqliteFsPath(configured: string): string;
export declare function ensureSqliteResilience(fsPath: string): Promise<void>;
interface RawSqlExecutor {
    $executeRawUnsafe(query: string): Promise<number>;
}
export declare function createBackupIfNeeded(client: RawSqlExecutor, fsPath: string): Promise<void>;
export {};
