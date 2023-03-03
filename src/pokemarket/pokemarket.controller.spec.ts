import { Test, TestingModule } from '@nestjs/testing';
import { PokemarketController } from './pokemarket.controller';
import { PokemarketService } from './pokemarket.service';

describe('PokemarketController', () => {
  let controller: PokemarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemarketController],
      providers: [PokemarketService],
    }).compile();

    controller = module.get<PokemarketController>(PokemarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
