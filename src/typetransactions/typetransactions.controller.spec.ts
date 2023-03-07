import { Test, TestingModule } from '@nestjs/testing';
import { TypetransactionsController } from './typetransactions.controller';
import { TypetransactionsService } from './typetransactions.service';

describe('TypetransactionsController', () => {
  let controller: TypetransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypetransactionsController],
      providers: [TypetransactionsService],
    }).compile();

    controller = module.get<TypetransactionsController>(TypetransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
