import { Test, TestingModule } from '@nestjs/testing';
import { GestionPreferenciasController } from './gestion-preferencias.controller';
import { GestionPreferenciasService } from './gestion-preferencias.service';

describe('GestionPreferenciasController', () => {
  let controller: GestionPreferenciasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionPreferenciasController],
      providers: [GestionPreferenciasService],
    }).compile();

    controller = module.get<GestionPreferenciasController>(GestionPreferenciasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
