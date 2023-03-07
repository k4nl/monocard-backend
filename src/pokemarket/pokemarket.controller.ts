import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pokemarket')
export class PokemarketController {
  constructor(private readonly pokemarketService: PokemarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addToMarket(
    @Body() createPokemarketDto: CreatePokemarketDto,
    @Req() req: any,
  ) {
    try {
      return this.pokemarketService.addToMarket(createPokemarketDto, req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    try {
      return this.pokemarketService.findAll(req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('to-buy')
  findAllToBuy(@Req() req: any) {
    try {
      return this.pokemarketService.findAllToBuy(req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    try {
      return this.pokemarketService.findOne(+id, req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePokemarketDto: UpdatePokemarketDto,
    @Req() req: any,
  ) {
    try {
      return this.pokemarketService.update(+id, updatePokemarketDto, req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    try {
      return this.pokemarketService.remove(+id, req.user);
    } catch (error) {
      return error;
    }
  }
}
