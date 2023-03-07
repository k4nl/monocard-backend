import { Injectable } from '@nestjs/common';
import { CreatePlayerbankDto } from './dto/create-playerbank.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Playerbank } from './entities/playerbank.entity';
import { User } from 'src/user/entities/user.entity';
import { Typetransaction } from 'src/typetransactions/entities/typetransaction.entity';

@Injectable()
export class PlayerbankService {
  constructor(
    @InjectModel(Playerbank)
    private playerbankModel: typeof Playerbank,
  ) {}

  async create(createPlayerbankDto: CreatePlayerbankDto, user: any) {
    const response = await this.playerbankModel.create({
      user_id: user.id,
      ...createPlayerbankDto,
    });
    return response;
  }

  async findAll(user: any) {
    const response = await this.playerbankModel.findAll({
      where: { user_id: user.id },
      attributes: ['id', 'amount', 'createdAt', 'updatedAt'],
      include: [
        { model: User, attributes: ['id', 'name'], as: 'user' },
        {
          model: Typetransaction,
          attributes: ['id', 'name'],
          as: 'typetransaction',
        },
      ],
    });
    return response;
  }

  async findOne(id: number, user: any) {
    const response = await this.playerbankModel.findOne({
      where: { id, user_id: user.id },
      attributes: ['id', 'amount', 'createdAt', 'updatedAt'],
      include: [
        { model: User, attributes: ['id', 'name'], as: 'user' },
        {
          model: Typetransaction,
          attributes: ['id', 'name'],
          as: 'typetransaction',
        },
      ],
    });
    return response;
  }
}
