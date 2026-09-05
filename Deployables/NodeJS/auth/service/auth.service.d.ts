import { OnModuleInit } from "@nestjs/common";
import { DatabaseService } from "../../database/service/database.service";
import { ClusterDto } from "../dto/cluster.dto";
import { AppConfigDto } from "../../config/dto/app-config.dto";
export declare class AuthService implements OnModuleInit {
    private readonly databaseService;
    private readonly config;
    private readonly logger;
    constructor(databaseService: DatabaseService, config: AppConfigDto);
    onModuleInit(): Promise<void>;
    private registerClusters;
    register(id: string): Promise<ClusterDto>;
    login(id: string, secret: string): Promise<ClusterDto>;
}
