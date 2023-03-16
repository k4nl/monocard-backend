import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() createPokemonDto: CreatePokemonDto) {
    const { user } = req;
    return this.pokemonService.create(createPokemonDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Req() req: any, @Query() query: any) {
    const { user } = req;
    return this.pokemonService.findAllByUser(user, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(@Query() query: any) {
    return this.pokemonService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const { user } = req;
    return this.pokemonService.findOne(+id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    const { user } = req;
    return this.pokemonService.remove(+id, user);
  }
}
