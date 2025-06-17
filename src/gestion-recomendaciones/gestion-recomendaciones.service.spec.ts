import { Test, TestingModule } from '@nestjs/testing';
import { GestionRecomendacionesService } from './gestion-recomendaciones.service';

describe('GestionRecomendacionesService', () => {
  let service: GestionRecomendacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionRecomendacionesService],
    }).compile();

    service = module.get<GestionRecomendacionesService>(GestionRecomendacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
