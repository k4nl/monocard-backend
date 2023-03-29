import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { PokemonApi } from './entities/pokemon.pokeapi';
import { PokemonMarketPokedexDto } from 'src/pokemarket/dto/pokemon-market-pokedex.dto';
import QueryParameters from 'src/utils/QueryParameters';
import StringFunctions from 'src/utils/StringFunctions';

@Injectable()
export class PokeApiService {
  private pokeApiHash: { [key: number]: { data: any } };
  constructor() {
    this.pokeApiHash = {};
  }

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

  static async fetchPokemonAbility(ability: string) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/ability/${ability}`,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async fetchPokemonType(type: number) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`,
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async fetchPokemon() {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/?limit=1279',
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static verifyPokemonHash(id: number, hash: { [key: number]: { data: any } }) {
    if (hash[id]) return hash[id];
    return null;
  }

  static getResponse = async (id: number) => {
    const response = await PokeApiService.fetchPokemonInfo(id);
    return response;
  };

  static async getPokemonsInfo(
    pokemons: any[],
    filters?: { name?: string; range?: any; types?: string[] },
    pagination?: { page: number; limit: number; offset: number; total: number },
  ) {
    const promises = [];
    const hash = new PokeApiService().pokeApiHash;
    let paginate = pagination.offset;
    for (let i = 0; i < pokemons.length; i++) {
      if (promises.length === pagination.limit) break;
      const pokemonId = StringFunctions.createPokemonId(
        pokemons[i].poke_api_id,
        pokemons[i].url,
      );
      let response: any;
      const hasHash = PokeApiService.verifyPokemonHash(pokemonId, hash);
      if (hasHash) {
        response = hasHash;
      } else {
        response = await PokeApiService.getResponse(pokemonId);
        hash[pokemonId] = response;
      }
      if (response.status !== 200) i++;
      const pokemonFiltered = QueryParameters.verifyFilters(
        filters,
        response.data,
      );
      if (pokemonFiltered) {
        if (paginate) {
          paginate--;
          continue;
        } else {
          promises.push(
            new PokemonApi({
              id: pokemons[i].id,
              poke_api_id: pokemons[i].poke_api_id,
              poke_infos: response.data,
            }),
          );
        }
      }
    }
    return Promise.all(promises);
  }

  static async getPokemonsMarketInfo(pokemons: PokemonMarketPokedexDto[]) {
    if (pokemons.length === 0) return [];
    return Promise.all(
      pokemons.map(
        async ({ pokemon, user, updatedAt, createdAt, price, id }) => {
          const response = await this.fetchPokemonInfo(pokemon.poke_api_id);
          if (response.status !== 200) {
            const newPokemon = new PokemonApi({
              id: pokemon.id,
              poke_api_id: pokemon.poke_api_id,
              poke_infos: null,
            });
            return {
              id,
              price,
              createdAt,
              updatedAt,
              pokemon: newPokemon,
              user,
            };
          }
          const newPokemon = new PokemonApi({
            id: pokemon.id,
            poke_api_id: pokemon.poke_api_id,
            poke_infos: response.data,
          });
          return {
            id,
            price,
            createdAt,
            updatedAt,
            pokemon: newPokemon,
            user,
          };
        },
      ),
    );
  }
}
