import { ExecutionContext } from "@nestjs/common";
export declare function setClusterId(context: ExecutionContext, clusterId: string): void;
export declare function getClusterId(context: ExecutionContext): string | undefined;
