"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inventory_gateway_1 = require("./inventory.gateway");
const app_module_1 = require("../../app.module");
describe("InventoryGateway", () => {
    let gateway;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        gateway = module.get(inventory_gateway_1.InventoryGateway);
    });
    it("should be defined", () => {
        expect(gateway).toBeDefined();
    });
});
//# sourceMappingURL=inventory.gateway.spec.js.map