import { Test, TestingModule } from '@nestjs/testing';
import { PokemarketService } from './pokemarket.service';

describe('PokemarketService', () => {
  let service: PokemarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemarketService],
    }).compile();

    service = module.get<PokemarketService>(PokemarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
