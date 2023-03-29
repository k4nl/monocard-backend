import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from '../utils/Bcrypt';
import { CustomError } from 'src/utils/CustomError';
import { UserPayload } from './dto/user-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async validateUserLogin(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { name: username },
      attributes: ['id', 'name', 'password', 'balance'],
    });
    if (!user) throw new CustomError(['Can not found user'], 400);
    const isMatch = await Bcrypt.comparePassword(pass, user.password);
    if (!isMatch) throw new CustomError(['Invalid password'], 400);
    return { name: user.name, id: user.id, balance: user.balance };
  }

  async login(user: UserPayload) {
    return {
      token: this.jwtService.sign({ id: user.id, name: user.name }),
    };
  }

  async validateUserRegister(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { name: username },
      attributes: ['id'],
    });
    if (user) throw new CustomError(['User already exists'], 400);
    const hashPassword = await Bcrypt.hashPassword(pass);
    const newUser = await this.userModel.create({
      name: username,
      password: hashPassword,
      balance: 0,
    });
    return { name: newUser.name, id: newUser.id, balance: newUser.balance };
  }
}
