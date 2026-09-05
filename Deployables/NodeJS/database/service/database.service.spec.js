"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("./database.service");
const app_module_1 = require("../../app.module");
describe("DatabaseService", () => {
    let databaseService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        databaseService = module.get(database_service_1.DatabaseService);
    });
    it("should be defined", () => {
        expect(databaseService).toBeDefined();
    });
});
//# sourceMappingURL=database.service.spec.js.map