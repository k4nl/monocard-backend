import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pokemon } from './entities/pokemon.entity';

@Module({
  imports: [SequelizeModule.forFeature([Pokemon])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
