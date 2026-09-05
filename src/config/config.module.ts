import { Global, Module } from '@nestjs/common';
import { APP_CONFIG } from './config.constants';
import { loadConfig } from './config.loader';

/**
 * @Global so DatabaseModule (and, later, anything else that reads
 * Server.Port / Auth.AllowClusterRegistration / Inventory.BatchWindowMs /
 * Logging.Verbose once those are wired up) can inject APP_CONFIG without
 * every feature module re-importing ConfigModule explicitly.
 *
 * Import this in AppModule's `imports` array — first, before DatabaseModule,
 * so the config is available when DatabaseService is constructed.
 */
@Global()
@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: () => loadConfig(),
    },
  ],
  exports: [APP_CONFIG],
})
export class ConfigModule {}
