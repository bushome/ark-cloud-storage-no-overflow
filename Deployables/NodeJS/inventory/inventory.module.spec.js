"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const inventory_module_1 = require("./inventory.module");
const app_module_1 = require("../app.module");
describe("InventoryModule", () => {
    let inventoryModule;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        inventoryModule = module.get(inventory_module_1.InventoryModule);
    });
    it("should be defined", () => {
        expect(inventoryModule).toBeDefined();
    });
});
//# sourceMappingURL=inventory.module.spec.js.map