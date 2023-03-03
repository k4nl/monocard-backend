import { Module } from '@nestjs/common';
import { TypetransactionsService } from './typetransactions.service';
import { TypetransactionsController } from './typetransactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Typetransaction } from './entities/typetransaction.entity';

@Module({
  imports: [SequelizeModule.forFeature([Typetransaction])],
  controllers: [TypetransactionsController],
  providers: [TypetransactionsService],
})
export class TypetransactionsModule {}
