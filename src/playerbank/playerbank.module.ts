import { Module } from '@nestjs/common';
import { PlayerbankService } from './playerbank.service';
import { PlayerbankController } from './playerbank.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playerbank } from './entities/playerbank.entity';

@Module({
  imports: [SequelizeModule.forFeature([Playerbank])],
  controllers: [PlayerbankController],
  providers: [PlayerbankService],
  exports: [PlayerbankService],
})
export class PlayerbankModule {}
