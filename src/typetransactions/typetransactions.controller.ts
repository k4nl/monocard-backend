import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TypetransactionsService } from './typetransactions.service';
import { CreateTypetransactionDto } from './dto/create-typetransaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('typetransactions')
export class TypetransactionsController {
  constructor(
    private readonly typetransactionsService: TypetransactionsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTypetransactionDto: CreateTypetransactionDto) {
    try {
      return this.typetransactionsService.create(createTypetransactionDto);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.typetransactionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typetransactionsService.findOne(+id);
  }
}
