import { IsNumber } from 'class-validator';

export class PokemonUserPokedexDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  readonly poke_api_id: number;
}
