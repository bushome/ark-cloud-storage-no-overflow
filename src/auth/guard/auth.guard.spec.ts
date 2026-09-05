import { AuthGuard } from "./auth.guard";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";

describe("AuthGuard", () => {
    let authGuard: AuthGuard;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        authGuard = module.get<AuthGuard>(AuthGuard);
    });

    it("should be defined", () => {
        expect(authGuard).toBeDefined();
    });
});
