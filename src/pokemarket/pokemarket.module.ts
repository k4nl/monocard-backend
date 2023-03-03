import { Module } from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { PokemarketController } from './pokemarket.controller';

@Module({
  controllers: [PokemarketController],
  providers: [PokemarketService]
})
export class PokemarketModule {}
