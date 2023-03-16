import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common';
import { Pagination } from 'src/utils/Pagination';
import StringFunctions from 'src/utils/StringFunctions';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiService } from './pokeapi.service';
import Verifier from './verifier';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon)
    private pokemonModel: typeof Pokemon,
  ) {}
  async create(createPokemonDto: CreatePokemonDto, user: any) {
    const pokeApiResponse = await PokeApiService.fetchPokemonInfo(
      createPokemonDto.pokemon_id,
    );
    Verifier.verifyResponse(pokeApiResponse);
    const response = await this.pokemonModel.create({
      poke_api_id: createPokemonDto.pokemon_id,
      user_id: user.id,
    });
    return response;
  }

  async findAllByUser(user: any, query: any) {
    const pagination = new Pagination(query.page, query.total).getPagination();
    const response = await this.pokemonModel.findAndCountAll({
      where: { user_id: user.id },
      limit: pagination.limit,
      offset: pagination.offset,
    });
    const formatedResponse = await PokeApiService.getPokemonsInfo(
      response.rows,
    );
    return {
      content: formatedResponse,
      actualPage: pagination.page,
      totalPages: Math.ceil(response.count / pagination.limit),
      totalContent: response.count,
    };
  }

  async findAll(query: any) {
    const pagination = new Pagination(query.page, query.total).getPagination();
    const arrayPokemon = await PokeApiService.fetchPokemon(
      30,
      pagination.offset,
    );
    const pokemonsInfo = await Promise.all(
      arrayPokemon.data.results.map(async (pokemon: any) => {
        const pokemonId = StringFunctions.getPokemonIdFromUrl(pokemon.url);
        const response = await PokeApiService.fetchPokemonInfo(pokemonId);
        return response.data;
      }),
    );
    return {
      content: pokemonsInfo,
      actualPage: pagination.page,
      totalPages: Math.ceil(arrayPokemon.data.count / pagination.limit),
      totalContent: arrayPokemon.data.count,
    };
  }

  async findOne(id: number, user: any) {
    const response = await this.pokemonModel.findOne({
      where: { id, user_id: user.id },
    });
    return response;
  }

  async remove(id: number, user: any) {
    const response = await this.pokemonModel.destroy({
      where: { id, user_id: user.id },
    });
    return response;
  }
}
