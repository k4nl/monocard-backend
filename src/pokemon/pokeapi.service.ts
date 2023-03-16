import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { PokemonApi } from './entities/pokemon.pokeapi';
import { PokemonUserPokedexDto } from './dto/pokemon-user-pokedex.dto';

@Injectable()
export class PokeApiService {
  static async fetchPokemonInfo(id: number) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async fetchPokemon(limit?: number, offset?: number) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit || 20}&offset=${
          offset || 0
        }`,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getPokemonsInfo(pokemons: PokemonUserPokedexDto[]) {
    if (pokemons.length === 0) return [];
    return Promise.all(
      pokemons.map(async (pokemon) => {
        const response = await this.fetchPokemonInfo(pokemon.poke_api_id);
        if (response.status !== 200)
          return new PokemonApi({
            id: pokemon.id,
            poke_api_id: pokemon.poke_api_id,
            poke_infos: null,
          });
        return new PokemonApi({
          id: pokemon.id,
          poke_api_id: pokemon.poke_api_id,
          poke_infos: response.data,
        });
      }),
    );
  }
}
