"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_module_1 = require("./database.module");
const app_module_1 = require("../app.module");
describe("DatabaseModule", () => {
    let databaseModule;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        databaseModule = module.get(database_module_1.DatabaseModule);
    });
    it("should be defined", () => {
        expect(databaseModule).toBeDefined();
    });
});
//# sourceMappingURL=database.module.spec.js.map