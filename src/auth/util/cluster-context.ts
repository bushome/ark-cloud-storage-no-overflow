import { ExecutionContext } from "@nestjs/common";

export function setClusterId(context: ExecutionContext, clusterId: string): void {
    if (context.getType() === "ws") {
        const client = context.switchToWs().getClient();
        client.data = { ...client.data, clusterId };
    } else {
        context.switchToHttp().getRequest().clusterId = clusterId;
    }
}

export function getClusterId(context: ExecutionContext): string | undefined {
    if (context.getType() === "ws") {
        return context.switchToWs().getClient().data?.clusterId;
    }
    return context.switchToHttp().getRequest().clusterId;
}