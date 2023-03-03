import { Test, TestingModule } from '@nestjs/testing';
import { TypetransactionsService } from './typetransactions.service';

describe('TypetransactionsService', () => {
  let service: TypetransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypetransactionsService],
    }).compile();

    service = module.get<TypetransactionsService>(TypetransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
