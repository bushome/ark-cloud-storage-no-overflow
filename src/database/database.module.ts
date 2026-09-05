import { Module } from '@nestjs/common';
import { DatabaseService } from './service/database.service';

// No changes needed here beyond what you likely already have — APP_CONFIG
// is provided by the @Global() ConfigModule, so DatabaseService can inject
// it without DatabaseModule importing ConfigModule itself. Just make sure
// ConfigModule is imported in AppModule before DatabaseModule.
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
