"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveSqliteFsPath = resolveSqliteFsPath;
exports.ensureSqliteResilience = ensureSqliteResilience;
exports.createBackupIfNeeded = createBackupIfNeeded;
const client_1 = require("@libsql/client");
const fs_1 = require("fs");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const app_root_1 = require("../../config/app-root");
const logger = new common_1.Logger('SqliteResilience');
const BACKUP_RETENTION_COUNT = 6;
const BACKUP_DIR_NAME = 'backups';
function resolveSqliteFsPath(configured) {
    return configured.startsWith('file:') ? configured.slice('file:'.length) : (0, app_root_1.resolveAppPath)(configured);
}
function getBackupDir(fsPath) {
    return (0, path_1.join)((0, path_1.dirname)(fsPath), BACKUP_DIR_NAME);
}
function backupFileName(fsPath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${(0, path_1.basename)(fsPath)}.${timestamp}.bak`;
}
function listBackups(fsPath) {
    const dir = getBackupDir(fsPath);
    if (!(0, fs_1.existsSync)(dir)) {
        return [];
    }
    const prefix = `${(0, path_1.basename)(fsPath)}.`;
    return (0, fs_1.readdirSync)(dir)
        .filter((name) => name.startsWith(prefix) && name.endsWith('.bak'))
        .sort()
        .reverse()
        .map((name) => (0, path_1.join)(dir, name));
}
async function isSqliteFileValid(targetFsPath) {
    let client;
    try {
        client = (0, client_1.createClient)({ url: `file:${targetFsPath}` });
        const result = await client.execute('PRAGMA quick_check');
        return result.rows.length > 0 && result.rows[0].quick_check === 'ok';
    }
    catch {
        return false;
    }
    finally {
        client?.close();
    }
}
async function restoreFromNewestValidBackup(fsPath) {
    for (const backupPath of listBackups(fsPath)) {
        if (!(await isSqliteFileValid(backupPath))) {
            logger.warn(`Backup ${backupPath} also failed its own integrity check — trying an older one.`);
            continue;
        }
        for (const suffix of ['-wal', '-shm']) {
            const sidecar = fsPath + suffix;
            if ((0, fs_1.existsSync)(sidecar)) {
                (0, fs_1.rmSync)(sidecar);
            }
        }
        (0, fs_1.copyFileSync)(backupPath, fsPath);
        logger.log(`Restored ${fsPath} from backup ${backupPath}.`);
        return true;
    }
    return false;
}
async function ensureSqliteResilience(fsPath) {
    (0, fs_1.mkdirSync)((0, path_1.dirname)(fsPath), { recursive: true });
    if ((0, fs_1.existsSync)(fsPath) && !(await isSqliteFileValid(fsPath))) {
        logger.error(`SQLite integrity check failed for ${fsPath} — attempting automatic restore from backup.`);
        if (!(await restoreFromNewestValidBackup(fsPath))) {
            logger.error('No valid backup was available to restore from. Continuing with the existing file as-is — ' +
                'it may fail to open or may be missing data. Manual recovery may be required.');
        }
    }
    const client = (0, client_1.createClient)({ url: `file:${fsPath}` });
    try {
        await client.execute('PRAGMA journal_mode = WAL');
    }
    finally {
        client.close();
    }
}
async function createBackupIfNeeded(client, fsPath) {
    if (!(0, fs_1.existsSync)(fsPath)) {
        return;
    }
    const dir = getBackupDir(fsPath);
    (0, fs_1.mkdirSync)(dir, { recursive: true });
    const destPath = (0, path_1.join)(dir, backupFileName(fsPath));
    const escaped = destPath.replace(/'/g, "''");
    await client.$executeRawUnsafe(`VACUUM INTO '${escaped}'`);
    logger.log(`Backup written: ${destPath}`);
    pruneOldBackups(fsPath);
}
function pruneOldBackups(fsPath) {
    const backups = listBackups(fsPath);
    for (const stale of backups.slice(BACKUP_RETENTION_COUNT)) {
        (0, fs_1.rmSync)(stale);
        logger.debug(`Pruned old backup: ${stale}`);
    }
}
//# sourceMappingURL=sqlite-resilience.util.js.map