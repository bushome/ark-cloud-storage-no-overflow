"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const app_module_1 = require("../../app.module");
describe("AuthService", () => {
    let authService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        authService = module.get(auth_service_1.AuthService);
    });
    it("should be defined", () => {
        expect(authService).toBeDefined();
    });
});
//# sourceMappingURL=auth.service.spec.js.map