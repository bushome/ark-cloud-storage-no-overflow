import type { Client as LibsqlClient } from '@libsql/client';
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs';
import { basename, dirname, join } from 'path';
import { Logger } from '@nestjs/common';
import { resolveAppPath } from '../../config/app-root';

const logger = new Logger('SqliteResilience');

// Hardcoded, not config.json-exposed — same reasoning already applied to
// the dupe-detection COUNT(*) >= 3 threshold: one less thing a solo player
// could misconfigure. 6 snapshots at the 15-minute interval used by
// SqliteResilienceService's @Cron job = 90 minutes of rolling coverage,
// deliberately deeper than the bare minimum to hedge against a machine
// crashing more than usual — see restoreFromNewestValidBackup below.
const BACKUP_RETENTION_COUNT = 6;
const BACKUP_DIR_NAME = 'backups';

/**
 * Strips a leading `file:` prefix (already-fully-resolved case) or anchors
 * a bare path to the app's own directory rather than cwd. Pure path logic,
 * unaffected by the better-sqlite3 -> libSQL migration.
 */
export function resolveSqliteFsPath(configured: string): string {
  return configured.startsWith('file:') ? configured.slice('file:'.length) : resolveAppPath(configured);
}

function getBackupDir(fsPath: string): string {
  return join(dirname(fsPath), BACKUP_DIR_NAME);
}

// Sortable-by-name timestamp (colons/dots replaced) — lexicographic sort
// order equals chronological order, so "newest first" is a plain reverse
// string sort, no filename parsing or mtime reads needed.
function backupFileName(fsPath: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${basename(fsPath)}.${timestamp}.bak`;
}

/** Newest-first list of existing backup file paths for fsPath. */
function listBackups(fsPath: string): string[] {
  const dir = getBackupDir(fsPath);
  if (!existsSync(dir)) {
    return [];
  }
  const prefix = `${basename(fsPath)}.`;
  return readdirSync(dir)
    .filter((name) => name.startsWith(prefix) && name.endsWith('.bak'))
    .sort()
    .reverse()
    .map((name) => join(dir, name));
}

/**
 * Opens a throwaway libSQL client pointed directly at targetFsPath and runs
 * PRAGMA quick_check. Used both for the live file (boot-time check) and for
 * validating individual backup files during restore.
 *
 * Async, unlike the previous better-sqlite3-based version — @libsql/client
 * has no synchronous API surface. This turned out to simplify the overall
 * architecture rather than complicate it; see ensureSqliteResilience's
 * comment below.
 */
async function isSqliteFileValid(targetFsPath: string): Promise<boolean> {
  // Lazily required — see ensureSqliteResilience's comment below for why
  // this can't be a top-level import.
  const { createClient } = require('@libsql/client');
  let client: LibsqlClient | undefined;
  try {
    client = createClient({ url: `file:${targetFsPath}` });
    const result = await client.execute('PRAGMA quick_check');
    return result.rows.length > 0 && (result.rows[0] as { quick_check?: string }).quick_check === 'ok';
  } catch {
    return false;
  } finally {
    client?.close();
  }
}

/**
 * Tries each existing backup, newest first, restoring the first one that
 * itself passes its own quick_check — not just blindly trusting the single
 * most recent one. This is the actual reason 6 snapshots are kept instead
 * of 1 (see BACKUP_RETENTION_COUNT above): a machine crashing more than
 * usual is exactly the case where the newest snapshot might also turn out
 * to be compromised.
 */
async function restoreFromNewestValidBackup(fsPath: string): Promise<boolean> {
  for (const backupPath of listBackups(fsPath)) {
    if (!(await isSqliteFileValid(backupPath))) {
      logger.warn(`Backup ${backupPath} also failed its own integrity check — trying an older one.`);
      continue;
    }

    // Remove any leftover -wal/-shm sidecars from the crashed session
    // before installing the backup, so nothing tries to replay a stale
    // (and possibly itself-corrupt) WAL against the freshly restored file
    // on next open.
    for (const suffix of ['-wal', '-shm']) {
      const sidecar = fsPath + suffix;
      if (existsSync(sidecar)) {
        rmSync(sidecar);
      }
    }

    copyFileSync(backupPath, fsPath);
    logger.log(`Restored ${fsPath} from backup ${backupPath}.`);
    return true;
  }
  return false;
}

/**
 * Boot-time integrity check + WAL-mode setup, run against the live file
 * with a throwaway libSQL client, BEFORE Prisma's own long-lived connection
 * is established via $connect().
 *
 * Called from DatabaseService.onModuleInit() — NOT from the constructor,
 * unlike the previous better-sqlite3-based version. That version had to run
 * inside the constructor specifically because better-sqlite3 opens the
 * database file synchronously the instant `new Database(path)` is called,
 * and Nest instantiates provider constructors during synchronous DI
 * resolution, before ANY OnModuleInit hook in the app fires — so a check
 * living in onModuleInit would always have run too late.
 *
 * @libsql/client has no such synchronous-open behavior; PrismaLibSql is
 * lazy and doesn't touch the file until a real connection/query happens.
 * That removes the hard ordering constraint entirely — onModuleInit's own
 * natural sequencing (this call happens before this.client.$connect() in
 * the same method) is sufficient on its own.
 *
 * On a fresh/nonexistent file, the integrity check trivially passes
 * (nothing to check) — this still runs in that case purely to set WAL mode
 * on the file before its very first real write.
 *
 * IMPORTANT — `@libsql/client` is required LAZILY inside this function and
 * inside isSqliteFileValid, never imported at the top of this file. Both
 * DatabaseService and SqliteResilienceService import from this module
 * unconditionally regardless of config.UseMySQL — a top-level
 * `import { createClient } from '@libsql/client'` here would mean simply
 * *loading* this module (which happens on every boot, MySQL or SQLite)
 * pulls in libSQL's native binary, not just *calling* this function.
 * Found the hard way (2026-09-06): this crashed clouddbSEA's bundled exe
 * on startup with `ERR_UNKNOWN_BUILTIN_MODULE` even after the same fix
 * was applied to database.service.ts's own PrismaLibSQL import, because
 * this file's separate top-level import was the actual remaining culprit
 * — SEA's bundled require() can only resolve genuine Node built-ins, not
 * native addon binaries, regardless of which file's import statement
 * triggers loading them.
 */
export async function ensureSqliteResilience(fsPath: string): Promise<void> {
  mkdirSync(dirname(fsPath), { recursive: true });

  if (existsSync(fsPath) && !(await isSqliteFileValid(fsPath))) {
    logger.error(`SQLite integrity check failed for ${fsPath} — attempting automatic restore from backup.`);
    if (!(await restoreFromNewestValidBackup(fsPath))) {
      logger.error(
        'No valid backup was available to restore from. Continuing with the existing file as-is — ' +
          'it may fail to open or may be missing data. Manual recovery may be required.',
      );
    }
  }

  // Lazily required — see the comment above this function for why this
  // can't be a top-level import. Runs unconditionally below
  // (corrupted-and-restored, corrupted-and-not-restored, or already
  // fine) — journal_mode is stored in the file's own header, so this is
  // a cheap no-op once already set, and every subsequent connection
  // (including Prisma's) inherits it with no extra wiring on Prisma's
  // side.
  const { createClient } = require('@libsql/client');
  const client = createClient({ url: `file:${fsPath}` });
  try {
    await client.execute('PRAGMA journal_mode = WAL');
  } finally {
    client.close();
  }
}

/**
 * Minimal shape needed from whatever Prisma client is passed in — avoids
 * this util file importing DatabaseService directly (which would create an
 * import cycle: DatabaseService's own module already imports from this
 * file for resolveSqliteFsPath/ensureSqliteResilience).
 */
interface RawSqlExecutor {
  $executeRawUnsafe(query: string): Promise<number>;
}

/**
 * Snapshots fsPath into the backup directory via SQLite's `VACUUM INTO`
 * statement, issued through Prisma's OWN already-open connection —
 * confirmed working under libSQL via a standalone verification script
 * before this migration (VACUUM INTO is not part of libSQL's own
 * documented compatibility matrix, so this was checked empirically rather
 * than assumed). No separate native handle is opened for this — the same
 * design principle as before the migration, just now on a foundation
 * (libSQL / napi-rs) that doesn't carry better-sqlite3's
 * node::ObjectWrap-related crash risk at all.
 *
 * Prunes down to BACKUP_RETENTION_COUNT snapshots afterward.
 */
export async function createBackupIfNeeded(client: RawSqlExecutor, fsPath: string): Promise<void> {
  if (!existsSync(fsPath)) {
    return; // nothing to back up yet
  }

  const dir = getBackupDir(fsPath);
  mkdirSync(dir, { recursive: true });
  const destPath = join(dir, backupFileName(fsPath));

  // destPath is entirely our own generated value (backup dir + our own
  // timestamp-based filename, never user/player input), so string
  // interpolation into raw SQL here is safe. VACUUM INTO also requires the
  // destination NOT already exist, which our per-millisecond timestamp
  // filenames guarantee in practice.
  const escaped = destPath.replace(/'/g, "''");
  await client.$executeRawUnsafe(`VACUUM INTO '${escaped}'`);
  logger.log(`Backup written: ${destPath}`);

  pruneOldBackups(fsPath);
}

function pruneOldBackups(fsPath: string): void {
  const backups = listBackups(fsPath); // newest first
  for (const stale of backups.slice(BACKUP_RETENTION_COUNT)) {
    rmSync(stale);
    logger.debug(`Pruned old backup: ${stale}`);
  }
}
