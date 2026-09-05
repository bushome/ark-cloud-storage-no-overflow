import "ws";

declare module "ws" {
    interface WebSocket {
        data?: {
            clusterId?: string;
        };
    }
}