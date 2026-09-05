import { Cluster } from "../../../generated/mysql-client";
export declare class ClusterDto {
    id: string;
    secret: string;
    constructor(id: string, secret: string);
    static fromDatabase(cluster: Cluster): ClusterDto;
}
