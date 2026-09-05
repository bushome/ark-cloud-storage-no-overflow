export declare abstract class StorageDto<T extends string = string> {
    type: T;
    ownerId: number;
    protected constructor(type: T, ownerId: number);
}
