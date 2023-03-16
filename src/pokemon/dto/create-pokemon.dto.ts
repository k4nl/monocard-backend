import { IsNumber } from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  readonly pokemon_id: number;
}
