import { Module } from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { PokemarketController } from './pokemarket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pokemarket } from './entities/pokemarket.entity';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [SequelizeModule.forFeature([Pokemarket]), PokemonModule],
  controllers: [PokemarketController],
  providers: [PokemarketService],
})
export class PokemarketModule {}
