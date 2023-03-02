import { IsNumber } from 'class-validator';

export class UpdatePokemonDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly user_id: number;
}
