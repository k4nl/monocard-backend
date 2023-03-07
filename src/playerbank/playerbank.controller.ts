import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlayerbankService } from './playerbank.service';
import { CreatePlayerbankDto } from './dto/create-playerbank.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('playerbank')
export class PlayerbankController {
  constructor(private readonly playerbankService: PlayerbankService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPlayerbankDto: CreatePlayerbankDto, @Req() req: any) {
    try {
      return this.playerbankService.create(createPlayerbankDto, req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    try {
      return this.playerbankService.findAll(req.user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    try {
      return this.playerbankService.findOne(+id, req.user);
    } catch (error) {
      return error;
    }
  }
}
