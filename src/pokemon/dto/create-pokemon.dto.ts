import { IsNumber } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  readonly pokemon_id: number;

  @IsNumber()
  readonly user_id: number;
}
