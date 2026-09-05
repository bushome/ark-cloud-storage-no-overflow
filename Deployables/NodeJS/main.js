"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth/guard/auth.guard");
const custom_ws_adapter_service_1 = require("./lib/custom-ws-adapter.service");
const config_loader_1 = require("./config/config.loader");
const process = require("node:process");
async function bootstrap() {
    const config = (0, config_loader_1.loadConfig)();
    const logger = config.Logging.Verbose
        ? ["error", "warn", "log", "debug", "verbose"]
        : ["error", "warn", "log"];
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger,
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
        },
        moduleIdGeneratorAlgorithm: "deep-hash",
    });
    app.useWebSocketAdapter(new custom_ws_adapter_service_1.CustomWsAdapter(app));
    app.useGlobalPipes(new common_1.ValidationPipe());
    const authGuard = app.get(auth_guard_1.AuthGuard);
    app.useGlobalGuards(authGuard);
    const port = process.env.PORT || config.Server.Port;
    await app.listen(port);
    common_1.Logger.log(`Server running on http://localhost:${port}`, "Bootstrap");
}
bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map