import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';

@Controller('pokemarket')
export class PokemarketController {
  constructor(private readonly pokemarketService: PokemarketService) {}

  @Post()
  create(@Body() createPokemarketDto: CreatePokemarketDto) {
    return this.pokemarketService.create(createPokemarketDto);
  }

  @Get()
  findAll() {
    return this.pokemarketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemarketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemarketDto: UpdatePokemarketDto) {
    return this.pokemarketService.update(+id, updatePokemarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemarketService.remove(+id);
  }
}
