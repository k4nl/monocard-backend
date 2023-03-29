import { Module } from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { PokemarketController } from './pokemarket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pokemarket } from './entities/pokemarket.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { UserModule } from 'src/user/user.module';
import { PlayerbankModule } from 'src/playerbank/playerbank.module';
import { TransactionRunner } from 'src/database/transactionRunner';

@Module({
  imports: [
    SequelizeModule.forFeature([Pokemarket]),
    PokemonModule,
    UserModule,
    PlayerbankModule,
  ],
  controllers: [PokemarketController],
  providers: [PokemarketService, TransactionRunner],
  exports: [PokemarketService],
})
export class PokemarketModule {}
