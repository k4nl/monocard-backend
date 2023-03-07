import { IsNumber, Min, Max } from 'class-validator';

export class UpdateUserBalanceDto {
  @IsNumber()
  @Min(0)
  @Max(1000000000)
  readonly balance: number;
}
