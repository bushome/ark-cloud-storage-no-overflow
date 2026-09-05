"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("./auth.controller");
const app_module_1 = require("../../app.module");
describe("AuthController", () => {
    let authController;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        authController = module.get(auth_controller_1.AuthController);
    });
    it("should be defined", () => {
        expect(authController).toBeDefined();
    });
});
//# sourceMappingURL=auth.controller.spec.js.map