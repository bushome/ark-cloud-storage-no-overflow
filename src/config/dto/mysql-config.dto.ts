import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Only actually validated when AppConfigDto.UseMySQL === true — see the
 * @ValidateIf on AppConfigDto.MySQL. When running on SQLite these fields
 * are simply ignored, so they're safe to leave blank in config.json.
 */
export class MySqlConfigDto {
  @IsString()
  @IsNotEmpty()
  Host: string = '127.0.0.1';

  @IsInt()
  @Min(1)
  @Max(65535)
  Port: number = 3306;

  @IsString()
  @IsNotEmpty()
  User: string = '';

  @IsString()
  @IsNotEmpty()
  Password: string = '';

  @IsString()
  @IsNotEmpty()
  Database: string = '';

  /**
   * Maps to the old .env DATABASE_URL's `?connection_limit=N` query param —
   * that param stops applying once the app connects via config.json instead
   * of DATABASE_URL, since the runtime connection no longer reads
   * DATABASE_URL at all (only the Prisma CLI still does, for
   * generate/migrate). Deliberately left with no hardcoded default here
   * (undefined, not e.g. 10) — if omitted, PrismaMariaDb/the mariadb driver
   * apply their own built-in default pool size rather than this code
   * silently picking a number that might not match whatever was actually
   * tuned before.
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  ConnectionLimit?: number;
}