import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "./database.module";
import { AppModule } from "../app.module";

describe("DatabaseModule", () => {
    let databaseModule: DatabaseModule;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        databaseModule = module.get<DatabaseModule>(DatabaseModule);
    });

    it("should be defined", () => {
        expect(databaseModule).toBeDefined();
    });
});
