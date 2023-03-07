import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id/password')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.updatePassword(+id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  @Patch(':id/balance')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserBalance(
    @Param('id') id: string,
    @Body() updateUserBalance: UpdateUserBalanceDto,
  ) {
    try {
      return this.userService.updateUserBalance(+id, updateUserBalance);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(+id);
    } catch (error) {
      return this.userService.remove(+id);
    }
  }
}
