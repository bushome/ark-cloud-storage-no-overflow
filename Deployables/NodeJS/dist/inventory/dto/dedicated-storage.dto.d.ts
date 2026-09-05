import { DedicatedStorage } from "../../../generated/mysql-client";
import { StorageDto } from "./storage.dto";
export declare class DedicatedStorageDto extends StorageDto<"dedicated"> {
    resourceId: string;
    amount: number;
    constructor(ownerId: number, resourceId: string, amount: number);
    static fromDatabase(dedicatedStorage: DedicatedStorage): DedicatedStorageDto;
}
