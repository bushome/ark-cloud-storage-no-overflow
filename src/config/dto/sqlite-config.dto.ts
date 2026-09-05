import { IsNotEmpty, IsString } from 'class-validator';

export class SQLiteConfigDto {
  /** Path to the SQLite file, relative to the exe/cwd unless absolute. */
  @IsString()
  @IsNotEmpty()
  File: string = './data/cloudstorage.db';
}
