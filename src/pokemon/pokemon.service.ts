import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common';
import { Pagination } from 'src/utils/Pagination';
import StringFunctions from 'src/utils/StringFunctions';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiService } from './pokeapi.service';
import { Pokemarket } from 'src/pokemarket/entities/pokemarket.entity';
import Verifier from './verifier';
import QueryParameters from 'src/utils/QueryParameters';

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
    const filters = new QueryParameters(query).getFilters();
    const response = await this.pokemonModel.findAndCountAll({
      where: { user_id: user.id },
    });
    const formatedResponse = await PokeApiService.getPokemonsInfo(
      response.rows,
      filters,
      pagination,
    );
    return {
      content: formatedResponse,
      actualPage: pagination.page,
      totalContent: formatedResponse.length,
    };
  }

  async findAll(query: any) {
    const pagination = new Pagination(query.page, query.total).getPagination();
    const filters = new QueryParameters(query).getFilters();
    const arrayPokemon = await PokeApiService.fetchPokemon();
    const pokemonsInfo = await PokeApiService.getPokemonsInfo(
      arrayPokemon.data.results,
      filters,
      pagination,
    );
    return {
      content: pokemonsInfo,
      actualPage: pagination.page,
      totalContent: pokemonsInfo.length,
    };
  }

  async findAllToSell(user: any, query: any) {
    const pagination = new Pagination(query.page, query.total).getPagination();
    const filters = new QueryParameters(query).getFilters();
    const response = await this.pokemonModel.findAndCountAll({
      where: {
        user_id: user.id,
        '$pokemarket.id$': null,
      },
      include: {
        model: Pokemarket,
        as: 'pokemarket',
      },
    });
    const formatedResponse = await PokeApiService.getPokemonsInfo(
      response.rows,
      filters,
      pagination,
    );
    return {
      content: formatedResponse,
      actualPage: pagination.page,
      totalContent: formatedResponse.length,
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

  async update(id: number, data: any, transaction?: any) {
    const response = await this.pokemonModel.update(data, {
      where: { id },
      transaction: transaction || null,
    });
    return response;
  }
}
