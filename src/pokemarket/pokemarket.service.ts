import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { UserService } from 'src/user/user.service';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { BuyPokemarketDto } from './dto/buy-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';
import { Pokemarket } from './entities/pokemarket.entity';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { User } from 'src/user/entities/user.entity';
import Verifier from './verifier';
import { PokeApiService } from 'src/pokemon/pokeapi.service';
import { PlayerbankService } from 'src/playerbank/playerbank.service';
import { TransactionRunner } from 'src/database/transactionRunner';

@Injectable()
export class PokemarketService {
  constructor(
    @InjectModel(Pokemarket)
    private pokemarketModel: typeof Pokemarket,
    @Inject(PokemonService)
    private pokemonService: PokemonService,
    @Inject(UserService)
    private userService: UserService,
    @Inject(PlayerbankService)
    private playerbankService: PlayerbankService,
    @Inject(TransactionRunner)
    private transactionRunner: TransactionRunner,
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
      include: [
        {
          model: Pokemon,
          as: 'pokemon',
          attributes: ['id', 'poke_api_id'],
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'balance'],
          },
        },
      ],
      attributes: ['id', 'price', 'createdAt', 'updatedAt'],
    });
    const pokemonsInfos = await PokeApiService.getPokemonsMarketInfo(response);
    return pokemonsInfos;
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

  async remove(id: number, user: any, transaction?: any) {
    const response = await this.pokemarketModel.destroy({
      where: { id, user_id: user.id },
      transaction: transaction || null,
    });
    Verifier.deletePokemonAvailable(response);
    return response;
  }

  async makeTransaction({
    buyer_info,
    seller_info,
    pokemarket_info,
  }: {
    buyer_info: { id: number; balance: number };
    seller_info: { id: number; price: number; balance: number };
    pokemarket_info: { id: number; pokemon_id: number };
  }) {
    const transaction = await this.transactionRunner.startTransaction();
    try {
      // retira dinheiro do comprador
      await this.userService.updateUserBalance(
        buyer_info.id,
        { balance: buyer_info.balance - seller_info.price },
        transaction,
      ),
        // adiciona dinheiro ao vendedor
        await this.userService.updateUserBalance(
          seller_info.id,
          { balance: seller_info.balance + seller_info.price },
          transaction,
        ),
        // remove pokemon do mercado
        await this.remove(
          pokemarket_info.id,
          { id: seller_info.id },
          transaction,
        ),
        // adiciona pokemon ao comprador
        await this.pokemonService.update(
          pokemarket_info.pokemon_id,
          { user_id: buyer_info.id },
          transaction,
        ),
        // adiciona o log de transação do comprador
        await this.playerbankService.create(
          { transaction: 2, amount: seller_info.price },
          { id: buyer_info.id },
          transaction,
        ),
        // adiciona o log de transação do vendedor
        await this.playerbankService.create(
          { transaction: 1, amount: seller_info.price },
          { id: seller_info.id },
          transaction,
        ),
        await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async transaction(data: BuyPokemarketDto, user: any) {
    Verifier.buyerIsSeller(data.seller_id, user.id);
    const pokemarketItem = await this.findOne(data.pokemarket_id, {
      id: data.seller_id,
    });
    Verifier.hasPokemonAvailable(pokemarketItem);
    const buyerInfo = await this.userService.findOne(user.id);
    const sellerInfo = await this.userService.findOne(data.seller_id);
    Verifier.hasBalance(buyerInfo, pokemarketItem.price);
    await this.makeTransaction({
      buyer_info: { id: buyerInfo.id, balance: buyerInfo.balance },
      seller_info: {
        id: sellerInfo.id,
        price: pokemarketItem.price,
        balance: sellerInfo.balance,
      },
      pokemarket_info: {
        id: pokemarketItem.id,
        pokemon_id: pokemarketItem.pokemon_id,
      },
    });
    return { message: 'Pokemon bought with success!' };
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
}
