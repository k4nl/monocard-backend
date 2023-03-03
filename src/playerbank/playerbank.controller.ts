import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerbankService } from './playerbank.service';
import { CreatePlayerbankDto } from './dto/create-playerbank.dto';
import { UpdatePlayerbankDto } from './dto/update-playerbank.dto';

@Controller('playerbank')
export class PlayerbankController {
  constructor(private readonly playerbankService: PlayerbankService) {}

  @Post()
  create(@Body() createPlayerbankDto: CreatePlayerbankDto) {
    return this.playerbankService.create(createPlayerbankDto);
  }

  @Get()
  findAll() {
    return this.playerbankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerbankService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerbankDto: UpdatePlayerbankDto) {
    return this.playerbankService.update(+id, updatePlayerbankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerbankService.remove(+id);
  }
}
