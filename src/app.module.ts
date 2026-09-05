import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule as AppConfigModule } from "./config/config.module";
import { InventoryModule } from "./inventory/inventory.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ScheduleModule } from "@nestjs/schedule";
import { HealthModule } from "./health/health.module"
/**
 * The root module that imports all other modules
 */
@Module({
    imports: [
        AppConfigModule,
        EventEmitterModule.forRoot(),
        DatabaseModule,
        AuthModule,
        InventoryModule,
		ScheduleModule.forRoot(),
		HealthModule,
    ],
})
export class AppModule {}