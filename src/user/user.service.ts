import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import Utils from 'src/utils';
import { CustomError } from 'src/utils/CustomError';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const response = await this.userModel.create({
      name: createUserDto.name,
      password: (await Utils.hashPassword(createUserDto.password)).toString(),
    });
    return {
      name: response.name,
      id: response.id,
    };
  }

  async findAll() {
    return this.userModel.findAll({ attributes: ['id', 'name'] });
  }

  findOne(id: number) {
    return this.userModel.findOne({
      where: { id },
      attributes: ['id', 'name'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const response = await this.userModel.update(
        {
          password: (
            await Utils.hashPassword(updateUserDto.password)
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
