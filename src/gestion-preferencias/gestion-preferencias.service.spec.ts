import { Test, TestingModule } from '@nestjs/testing';
import { GestionPreferenciasService } from './gestion-preferencias.service';

describe('GestionPreferenciasService', () => {
  let service: GestionPreferenciasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionPreferenciasService],
    }).compile();

    service = module.get<GestionPreferenciasService>(GestionPreferenciasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
