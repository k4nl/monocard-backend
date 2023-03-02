import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
