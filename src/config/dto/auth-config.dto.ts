import { Type } from 'class-transformer';
import { IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { RegisterClusterDto } from './register-cluster.dto';

export class AuthConfigDto {
  /**
   * Gates whether POST /auth/register will provision a new clusterId/secret
   * pair. Solo-player default (true, zero setup) differs in intent from the
   * cluster-operator default — operators typically flip this false once
   * their known servers are registered, since the endpoint is unauthenticated.
   */
  @IsBoolean()
  AllowClusterRegistration: boolean = true;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterClusterDto)
  RegisterClusters: RegisterClusterDto[] = [];
}
