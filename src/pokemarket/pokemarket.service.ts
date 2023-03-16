import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';
import { Pokemarket } from './entities/pokemarket.entity';
import Verifier from './virifier';

@Injectable()
export class PokemarketService {
  constructor(
    @InjectModel(Pokemarket)
    private pokemarketModel: typeof Pokemarket,
    @Inject(PokemonService)
    private pokemonService: PokemonService,
  ) {}

  async addToMarket(createPokemarketDto: CreatePokemarketDto, user: any) {
    const pokemon = await this.pokemonService.findOne(
      createPokemarketDto.pokemon_id,
      user,
    );
    Verifier.hasPokemonAvailable(pokemon);
    const response = await this.pokemarketModel.create({
      pokemon_id: createPokemarketDto.pokemon_id,
      user_id: user.id,
      price: createPokemarketDto.price,
    });
    return response;
  }

  async findAll(user: any) {
    const response = await this.pokemarketModel.findAll({
      where: { user_id: user.id },
    });
    return response;
  }

  async findAllToBuy(user: any) {
    const response = await this.pokemarketModel.findAll({
      where: { user_id: { [Op.not]: user.id } },
    });
    return response;
  }

  async findOne(id: number, user: any) {
    const response = await this.pokemarketModel.findOne({
      where: {
        id: id,
        user_id: user.id,
      },
    });
    return response;
  }

  async update(
    id: number,
    updatePokemarketDto: UpdatePokemarketDto,
    user: any,
  ) {
    const response = await this.pokemarketModel.update(updatePokemarketDto, {
      where: { id, user_id: user.id },
    });
    Verifier.updatePokemonAvailable(response[0]);
    return response;
  }

  async remove(id: number, user: any) {
    const response = await this.pokemarketModel.destroy({
      where: { id, user_id: user.id },
    });
    Verifier.deletePokemonAvailable(response);
    return response;
  }
}
