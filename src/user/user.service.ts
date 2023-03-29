import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import Bcrypt from 'src/utils/Bcrypt';
import { CustomError } from 'src/utils/CustomError';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import Verifier from './verifier';

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

  async findOne(id: number) {
    const response = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    Verifier.foundUser(response);
    return response;
  }

  async updatePassword(updateUserDto: UpdateUserDto, user: any) {
    const passHash = await Bcrypt.hashPassword(updateUserDto.password);
    const response = await this.userModel.update(
      { password: passHash },
      { where: { id: user.id } },
    );
    if (!response[0]) {
      throw new CustomError(['Error updating password'], 400);
    }
    return { message: 'Password updated' };
  }

  async updateUserBalance(
    id: number,
    { balance }: UpdateUserBalanceDto,
    transaction?: any,
  ) {
    try {
      const response = await this.userModel.update(
        {
          balance,
        },
        { where: { id }, transaction: transaction || null },
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
