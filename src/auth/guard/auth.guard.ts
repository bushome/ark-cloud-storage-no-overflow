import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Reflector } from "@nestjs/core";
import { ALLOW_UNAUTHORIZED } from "../constants";
import { setClusterId } from "../util/cluster-context";

/**
 * The authentication guard that determines whether the request is authorized
 */
@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const allowUnauthenticated = this.reflector.getAllAndOverride<boolean>(
            ALLOW_UNAUTHORIZED,
            [context.getHandler(), context.getClass()],
        );
        if (allowUnauthenticated) {
            return true;
        }

        let id: string;
        let secret: string;
        switch (context.getType()) {
            case "http": {
                const httpRequest = context.switchToHttp().getRequest();
                id = httpRequest.headers["x-cluster-id"];
                secret = httpRequest.headers["x-cluster-secret"];
                break;
            }
            case "ws": {
                const wsRequest = context.switchToWs().getClient();
                id = wsRequest.upgradeHeaders["x-cluster-id"];
                secret = wsRequest.upgradeHeaders["x-cluster-secret"];
                break;
            }
            default:
                throw new Error("Invalid context type");
        }

        if (!id || !secret) {
            throw new UnauthorizedException();
        }

        // login() throws UnauthorizedException on any failure, so reaching
        // the next line means the cluster is authenticated.
        await this.authService.login(id, secret);

        // Store on the connection/request itself (not on the shared handler
        // function) so concurrent callers can't overwrite each other's value.
        setClusterId(context, id);

        return true;
    }
}