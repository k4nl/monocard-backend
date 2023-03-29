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
  HttpCode,
} from '@nestjs/common';
import { PokemarketService } from './pokemarket.service';
import { CreatePokemarketDto } from './dto/create-pokemarket.dto';
import { UpdatePokemarketDto } from './dto/update-pokemarket.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuyPokemarketDto } from './dto/buy-pokemarket.dto';
import { ErrorException } from 'src/error/error.exception';

@Controller('pokemarket')
export class PokemarketController {
  constructor(private readonly pokemarketService: PokemarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addToMarket(
    @Body() createPokemarketDto: CreatePokemarketDto,
    @Req() req: any,
  ) {
    try {
      return this.pokemarketService.addToMarket(createPokemarketDto, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    try {
      return this.pokemarketService.findAll(req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('transaction')
  @HttpCode(200)
  async transaction(@Body() buyMarket: BuyPokemarketDto, @Req() req: any) {
    try {
      return this.pokemarketService.transaction(buyMarket, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('to-buy')
  async findAllToBuy(@Req() req: any) {
    try {
      return this.pokemarketService.findAllToBuy(req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    try {
      return this.pokemarketService.findOne(+id, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePokemarketDto: UpdatePokemarketDto,
    @Req() req: any,
  ) {
    try {
      return this.pokemarketService.update(+id, updatePokemarketDto, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    try {
      return this.pokemarketService.remove(+id, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
