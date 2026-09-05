import { AuthService } from "../service/auth.service";
import { ClusterDto } from "../dto/cluster.dto";
import { LoginRequestDto } from "../dto/login.request.dto";
import { RegisterRequestDto } from "../dto/register.request.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginRequestDto): Promise<ClusterDto>;
    register(body: RegisterRequestDto): Promise<ClusterDto>;
}
