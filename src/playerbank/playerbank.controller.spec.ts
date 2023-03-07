import { Test, TestingModule } from '@nestjs/testing';
import { PlayerbankController } from './playerbank.controller';
import { PlayerbankService } from './playerbank.service';

describe('PlayerbankController', () => {
  let controller: PlayerbankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerbankController],
      providers: [PlayerbankService],
    }).compile();

    controller = module.get<PlayerbankController>(PlayerbankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
