import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { getClusterId } from "../util/cluster-context";

/**
 * The authorized cluster ID for the current connection/request.
 * Requires the AuthGuard to be used.
 */
export const ClusterId = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => getClusterId(context),
);