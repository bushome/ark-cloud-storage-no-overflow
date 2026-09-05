import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, LogLevel, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "./auth/guard/auth.guard";
import { CustomWsAdapter } from "./lib/custom-ws-adapter.service";
import { loadConfig } from "./config/config.loader";
import * as process from "node:process";

/**
 * The main function that starts the NestJS application
 * and listens on the specified port
 */
async function bootstrap() {
    // Config drives runtime log verbosity — see config.json's Logging.Verbose.
    // Default terminal verbosity excludes "debug"/"verbose" — high-volume,
    // low-signal logs (WS fan-out counts, connect/subscribe/disconnect
    // chatter) are logged at debug level in InventoryGateway and won't print
    // unless Logging.Verbose is true. Flip it in config.json and restart the
    // app (no rebuild needed) for live crafting/WS traffic checks.
    const config = loadConfig();
    const logger: LogLevel[] = config.Logging.Verbose
        ? ["error", "warn", "log", "debug", "verbose"]
        : ["error", "warn", "log"];

    // Create the NestJS application
    const app = await NestFactory.create(AppModule, {
        logger,
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
        },
        moduleIdGeneratorAlgorithm: "deep-hash",
    });

    // Use ws adapter
    app.useWebSocketAdapter(new CustomWsAdapter(app));

    // Enable validation for all routes
    app.useGlobalPipes(new ValidationPipe());

    // Enable authentication for all routes
    const authGuard = app.get(AuthGuard);
    app.useGlobalGuards(authGuard);

    const port = process.env.PORT || config.Server.Port;
    await app.listen(port);
    Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
}

bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});