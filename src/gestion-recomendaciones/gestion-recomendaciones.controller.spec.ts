import { Test, TestingModule } from '@nestjs/testing';
import { GestionRecomendacionesController } from './gestion-recomendaciones.controller';
import { GestionRecomendacionesService } from './gestion-recomendaciones.service';

describe('GestionRecomendacionesController', () => {
  let controller: GestionRecomendacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionRecomendacionesController],
      providers: [GestionRecomendacionesService],
    }).compile();

    controller = module.get<GestionRecomendacionesController>(GestionRecomendacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
