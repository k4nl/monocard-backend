import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ErrorException } from 'src/error/error.exception';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(+id);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/password')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePassword(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.updatePassword(updateUserDto, req.user);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Patch(':id/balance')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUserBalance(
    @Param('id') id: string,
    @Body() updateUserBalance: UpdateUserBalanceDto,
  ) {
    try {
      return this.userService.updateUserBalance(+id, updateUserBalance);
    } catch (error) {
      throw new ErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return this.userService.remove(+id);
    } catch (error) {
      return this.userService.remove(+id);
    }
  }
}
