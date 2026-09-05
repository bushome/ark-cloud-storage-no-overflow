import { IsInt, Min } from 'class-validator';

export class InventoryConfigDto {
  @IsInt()
  @Min(0)
  BatchWindowMs: number = 100;
}
