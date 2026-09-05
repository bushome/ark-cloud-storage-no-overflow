import { IsInt, IsString, Min } from 'class-validator';

export class AuditLogConfigDto {
  @IsInt()
  @Min(0)
  RetentionDays: number = 3;

  /** Empty string means "disabled" — checked at the call site, not here. */
  @IsString()
  DiscordWebhook: string = '';
}
