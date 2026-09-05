import { IsInt, Max, Min } from 'class-validator';

export class ServerConfigDto {
  @IsInt()
  @Min(1)
  @Max(65535)
  Port: number = 3000;
}
