import { Injectable } from '@nestjs/common';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';

@Injectable()
export class PokemarketService {
  create(createPokemarketDto: CreatePokemarketDto) {
    return 'This action adds a new pokemarket';
  }

  findAll() {
    return `This action returns all pokemarket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemarket`;
  }

  update(id: number, updatePokemarketDto: UpdatePokemarketDto) {
    return `This action updates a #${id} pokemarket`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemarket`;
  }
}
