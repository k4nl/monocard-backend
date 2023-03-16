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
      attributes: ['id', 'name', 'password'],
    });
    if (!user) throw new CustomError(['Can not found user'], 400);
    const isMatch = await Bcrypt.comparePassword(pass, user.password);
    if (!isMatch) throw new CustomError(['Invalid password'], 400);
    return { name: user.name, id: user.id };
  }

  async login(user: UserPayload) {
    return {
      token: this.jwtService.sign(user),
    };
  }
}
