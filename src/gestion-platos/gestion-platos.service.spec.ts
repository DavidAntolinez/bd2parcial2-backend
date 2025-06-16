import { Test, TestingModule } from '@nestjs/testing';
import { GestionPlatosService } from './gestion-platos.service';

describe('GestionPlatosService', () => {
  let service: GestionPlatosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionPlatosService],
    }).compile();

    service = module.get<GestionPlatosService>(GestionPlatosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
