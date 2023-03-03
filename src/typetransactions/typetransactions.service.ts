import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypetransactionDto } from './dto/create-typetransaction.dto';
import { Typetransaction } from './entities/typetransaction.entity';

@Injectable()
export class TypetransactionsService {
  constructor(
    @InjectModel(Typetransaction)
    private typeTransactionModel: typeof Typetransaction,
  ) {}

  async create(createTypetransactionDto: CreateTypetransactionDto) {
    const response = await this.typeTransactionModel.create({
      name: createTypetransactionDto.name,
    });
    return response;
  }

  findAll() {
    const response = this.typeTransactionModel.findAll();
    return response;
  }

  findOne(id: number) {
    const response = this.typeTransactionModel.findOne({
      where: { id },
    });
    return response;
  }
}
