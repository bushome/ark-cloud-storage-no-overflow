import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { APP_CONFIG } from '../../config/config.constants';
import { AppConfigDto } from '../../config/dto/app-config.dto';
import { DatabaseService } from './database.service';
import { createBackupIfNeeded, resolveSqliteFsPath } from '../util/sqlite-resilience.util';

/**
 * Periodic-backup half of SQLite Resilience (see CLAUDE.md's "SQLite
 * Resilience" design section). The boot-time integrity check + restore
 * half deliberately does NOT live here — it lives in
 * DatabaseService.buildSqliteClient via
 * sqlite-resilience.util.ts's ensureSqliteResilience, since that has to run
 * before ANY OnModuleInit hook fires (see that function's own comment for
 * the full reasoning). This service only owns the recurring snapshot job.
 *
 * Entirely inert when config.UseMySQL is true — MariaDB is already a
 * transactional server and needs none of this. Gated in the constructor
 * rather than at the module level, matching how InventoryService gates
 * audit logging on the same flag.
 *
 * Backup mechanism: issues `VACUUM INTO` through DatabaseService's own
 * existing Prisma connection, NOT a second, separate native
 * better-sqlite3 handle (which is what an earlier version of this service
 * did via db.backup(), the Online Backup API). Repeated open/close of a
 * second native handle every 15 minutes, on top of Prisma's own
 * long-lived connection to the same file, turned out to be the likely
 * cause of a recurring native Node crash — see the comment on
 * createBackupIfNeeded in sqlite-resilience.util.ts for the full story.
 * VACUUM INTO achieves the same "consistent snapshot regardless of
 * concurrent activity" guarantee with zero additional native handles.
 */
@Injectable()
export class SqliteResilienceService {
  private readonly logger = new Logger(SqliteResilienceService.name);
  private readonly enabled: boolean;
  private readonly fsPath: string;

  constructor(
    @Inject(APP_CONFIG) config: AppConfigDto,
    private readonly db: DatabaseService,
  ) {
    this.enabled = !config.UseMySQL;
    this.fsPath = resolveSqliteFsPath(config.SQLite.File);
  }

  // Every 15 minutes — deliberately matches ARK's own default world-save
  // frequency, both as a familiar reference point and because a tighter
  // interval gives more chances to land on a clean snapshot on a
  // crash-prone machine. See BACKUP_RETENTION_COUNT in
  // sqlite-resilience.util.ts for the retention-count rationale.
  @Cron('*/15 * * * *')
  async handleBackup(): Promise<void> {
    if (!this.enabled) {
      return;
    }
    try {
      await createBackupIfNeeded(this.db, this.fsPath);
    } catch (err) {
      // A failed backup attempt should never crash the app or block
      // crafting — same "never let auxiliary safety machinery take down
      // the main path" principle as InventoryService.logDeduction's own
      // swallowed failures.
      this.logger.warn(`SQLite backup attempt failed: ${err}`);
    }
  }
}
