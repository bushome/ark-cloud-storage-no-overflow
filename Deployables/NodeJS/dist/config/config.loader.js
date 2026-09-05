"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const fs_1 = require("fs");
const path_1 = require("path");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const app_root_1 = require("./app-root");
const app_config_dto_1 = require("./dto/app-config.dto");
function loadConfig(configPath = (0, path_1.join)((0, app_root_1.getAppRootDir)(), 'config.json')) {
    let raw = {};
    if ((0, fs_1.existsSync)(configPath)) {
        let text;
        try {
            text = (0, fs_1.readFileSync)(configPath, 'utf-8');
        }
        catch (err) {
            throw new Error(`Could not read config.json at ${configPath}: ${err.message}`);
        }
        try {
            raw = JSON.parse(text);
        }
        catch (err) {
            throw new Error(`config.json at ${configPath} is not valid JSON: ${err.message}`);
        }
    }
    const config = (0, class_transformer_1.plainToInstance)(app_config_dto_1.AppConfigDto, raw);
    const errors = (0, class_validator_1.validateSync)(config, {
        whitelist: true,
        forbidNonWhitelisted: false,
    });
    if (errors.length > 0) {
        const messages = errors.flatMap((error) => flattenValidationError(error));
        throw new Error([
            `config.json failed validation (${configPath}):`,
            ...messages.map((m) => `  - ${m}`),
        ].join('\n'));
    }
    return config;
}
function flattenValidationError(error, pathPrefix = '') {
    const path = pathPrefix ? `${pathPrefix}.${error.property}` : error.property;
    const ownMessages = Object.values(error.constraints ?? {}).map((message) => `${path}: ${message}`);
    const childMessages = (error.children ?? []).flatMap((child) => flattenValidationError(child, path));
    return [...ownMessages, ...childMessages];
}
//# sourceMappingURL=config.loader.js.map