import { IsNumber, Min } from 'class-validator';
import { Max } from 'sequelize-typescript';

export class UpdateUserBalanceDto {
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  readonly balance: number;
}
