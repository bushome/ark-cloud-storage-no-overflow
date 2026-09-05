"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_guard_1 = require("./auth.guard");
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("../../app.module");
describe("AuthGuard", () => {
    let authGuard;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        authGuard = module.get(auth_guard_1.AuthGuard);
    });
    it("should be defined", () => {
        expect(authGuard).toBeDefined();
    });
});
//# sourceMappingURL=auth.guard.spec.js.map