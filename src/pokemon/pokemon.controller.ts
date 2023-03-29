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
import QueryParameters from 'src/utils/QueryParameters';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() createPokemonDto: CreatePokemonDto) {
    try {
      const { user } = req;
      return this.pokemonService.create(createPokemonDto, user);
    } catch (error) {
      return error;
    }
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
  @Get('sell')
  findAllToSell(@Req() req: any, @Query() query: any) {
    const { user } = req;
    return this.pokemonService.findAllToSell(user, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('filter')
  findAllByFilter(@Req() req: any, @Query() query: any) {
    const filters = new QueryParameters(query).getFilters();
    return filters;
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
