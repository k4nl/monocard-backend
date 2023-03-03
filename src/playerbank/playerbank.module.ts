import { Module } from '@nestjs/common';
import { PlayerbankService } from './playerbank.service';
import { PlayerbankController } from './playerbank.controller';

@Module({
  controllers: [PlayerbankController],
  providers: [PlayerbankService]
})
export class PlayerbankModule {}
