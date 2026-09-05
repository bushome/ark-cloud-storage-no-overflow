"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const audit_log_config_dto_1 = require("./audit-log-config.dto");
const auth_config_dto_1 = require("./auth-config.dto");
const inventory_config_dto_1 = require("./inventory-config.dto");
const logging_config_dto_1 = require("./logging-config.dto");
const mysql_config_dto_1 = require("./mysql-config.dto");
const server_config_dto_1 = require("./server-config.dto");
const sqlite_config_dto_1 = require("./sqlite-config.dto");
class AppConfigDto {
    constructor() {
        this.UseMySQL = false;
        this.MySQL = new mysql_config_dto_1.MySqlConfigDto();
        this.SQLite = new sqlite_config_dto_1.SQLiteConfigDto();
        this.Server = new server_config_dto_1.ServerConfigDto();
        this.Auth = new auth_config_dto_1.AuthConfigDto();
        this.Inventory = new inventory_config_dto_1.InventoryConfigDto();
        this.AuditLog = new audit_log_config_dto_1.AuditLogConfigDto();
        this.Logging = new logging_config_dto_1.LoggingConfigDto();
    }
}
exports.AppConfigDto = AppConfigDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AppConfigDto.prototype, "UseMySQL", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.UseMySQL),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => mysql_config_dto_1.MySqlConfigDto),
    __metadata("design:type", mysql_config_dto_1.MySqlConfigDto)
], AppConfigDto.prototype, "MySQL", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => sqlite_config_dto_1.SQLiteConfigDto),
    __metadata("design:type", sqlite_config_dto_1.SQLiteConfigDto)
], AppConfigDto.prototype, "SQLite", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => server_config_dto_1.ServerConfigDto),
    __metadata("design:type", server_config_dto_1.ServerConfigDto)
], AppConfigDto.prototype, "Server", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => auth_config_dto_1.AuthConfigDto),
    __metadata("design:type", auth_config_dto_1.AuthConfigDto)
], AppConfigDto.prototype, "Auth", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => inventory_config_dto_1.InventoryConfigDto),
    __metadata("design:type", inventory_config_dto_1.InventoryConfigDto)
], AppConfigDto.prototype, "Inventory", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => audit_log_config_dto_1.AuditLogConfigDto),
    __metadata("design:type", audit_log_config_dto_1.AuditLogConfigDto)
], AppConfigDto.prototype, "AuditLog", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => logging_config_dto_1.LoggingConfigDto),
    __metadata("design:type", logging_config_dto_1.LoggingConfigDto)
], AppConfigDto.prototype, "Logging", void 0);
//# sourceMappingURL=app-config.dto.js.map