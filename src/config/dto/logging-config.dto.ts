import { IsBoolean } from 'class-validator';

export class LoggingConfigDto {
  /** Maps to main.ts's `logger` array — true adds back "debug"/"verbose". */
  @IsBoolean()
  Verbose: boolean = false;
}
