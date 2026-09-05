import { WsAdapter } from "@nestjs/platform-ws";
export declare class CustomWsAdapter extends WsAdapter {
    create(port: number, options?: unknown): unknown;
}
