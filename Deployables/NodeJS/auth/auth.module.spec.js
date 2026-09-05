"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_module_1 = require("./auth.module");
const app_module_1 = require("../app.module");
describe("AuthModule", () => {
    let authModule;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        authModule = module.get(auth_module_1.AuthModule);
    });
    it("should be defined", () => {
        expect(authModule).toBeDefined();
    });
});
//# sourceMappingURL=auth.module.spec.js.map