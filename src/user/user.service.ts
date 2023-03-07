import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import Bcrypt from 'src/utils/Bcrypt';
import { CustomError } from 'src/utils/CustomError';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const response = await this.userModel.create({
      name: createUserDto.name,
      password: (await Bcrypt.hashPassword(createUserDto.password)).toString(),
      balance: 0,
    });
    return {
      name: response.name,
      id: response.id,
      balance: response.balance,
    };
  }

  async findAll() {
    return this.userModel.findAll({ attributes: { exclude: ['password'] } });
  }

  findOne(id: number) {
    return this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.userModel.update(
        {
          password: (
            await Bcrypt.hashPassword(updateUserDto.password)
          ).toString(),
        },
        { where: { id } },
      );
      if (!response[0]) throw new CustomError(['Error updating password'], 400);
      return { message: 'Password updated' };
    } catch (error) {
      return error;
    }
  }

  async updateUserBalance(id: number, { balance }: UpdateUserBalanceDto) {
    try {
      const response = await this.userModel.update(
        {
          balance,
        },
        { where: { id } },
      );
      if (!response[0]) throw new CustomError(['Error updating balance'], 400);
      return { message: 'Balance updated' };
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const response = await this.userModel.destroy({ where: { id } });
      if (!response) throw new CustomError(['Error deleting user'], 400);
      return response;
    } catch (error) {
      return error;
    }
  }
}
