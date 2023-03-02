import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize/dist/common';
import { Sequelize } from 'sequelize';
import { Pagination } from 'src/utils/Pagination';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokeApiService } from './pokeapi.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon)
    private pokemonModel: typeof Pokemon,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    const response = await this.pokemonModel.create({
      poke_api_id: createPokemonDto.pokemon_id,
      user_id: createPokemonDto.user_id,
    });
    return response;
  }

  async findAll(id: string, query: any) {
    const pagination = new Pagination(query.page, query.total).getPagination();
    const response = await this.pokemonModel.findAndCountAll({
      where: { user_id: Number(id) },
      limit: pagination.limit,
      offset: pagination.offset,
    });
    const formatedResponse = await PokeApiService.getPokemonsInfo(
      response.rows,
    );
    return {
      content: formatedResponse,
      page: pagination.page,
      total: response.count,
    };
  }

  findOne(id: number) {
    const response = this.pokemonModel.findOne({
      where: { id },
    });
    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
