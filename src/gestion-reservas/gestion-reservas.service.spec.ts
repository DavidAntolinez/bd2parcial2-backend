import { Test, TestingModule } from '@nestjs/testing';
import { GestionReservasService } from './gestion-reservas.service';

describe('GestionReservasService', () => {
  let service: GestionReservasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionReservasService],
    }).compile();

    service = module.get<GestionReservasService>(GestionReservasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
