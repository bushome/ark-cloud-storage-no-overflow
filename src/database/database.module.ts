import { Module } from '@nestjs/common';
import { DatabaseService } from './service/database.service';
import { SqliteResilienceService } from './service/sqlite-resilience.service';

// No changes needed beyond what you likely already have — APP_CONFIG is
// provided by the @Global() ConfigModule, so both services below can inject
// it without DatabaseModule importing ConfigModule itself. Just make sure
// ConfigModule is imported in AppModule before DatabaseModule.
//
// SqliteResilienceService is not exported — nothing outside this module
// needs to inject it directly, it only needs to exist as a provider so
// Nest registers its @Cron job.
@Module({
  providers: [DatabaseService, SqliteResilienceService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
