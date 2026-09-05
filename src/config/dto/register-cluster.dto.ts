import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterClusterDto {
  @IsString()
  @IsNotEmpty()
  ClusterId!: string;

  @IsString()
  @IsNotEmpty()
  Secret!: string;
}
