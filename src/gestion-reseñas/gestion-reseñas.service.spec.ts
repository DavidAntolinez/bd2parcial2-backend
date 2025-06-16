import { Test, TestingModule } from '@nestjs/testing';
import { GestionReseñasService } from './gestion-reseñas.service';

describe('GestionReseñasService', () => {
  let service: GestionReseñasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionReseñasService],
    }).compile();

    service = module.get<GestionReseñasService>(GestionReseñasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
