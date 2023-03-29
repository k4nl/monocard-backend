import { PokemonUserPokedexDto } from 'src/pokemon/dto/pokemon-user-pokedex.dto';

export class PokemonMarketPokedexDto {
  id: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  pokemon: PokemonUserPokedexDto;
  user: {
    id: number;
    name: string;
  };
}
