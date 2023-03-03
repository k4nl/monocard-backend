import { Test, TestingModule } from '@nestjs/testing';
import { PlayerbankService } from './playerbank.service';

describe('PlayerbankService', () => {
  let service: PlayerbankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerbankService],
    }).compile();

    service = module.get<PlayerbankService>(PlayerbankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
