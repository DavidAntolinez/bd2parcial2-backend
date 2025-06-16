import { Test, TestingModule } from '@nestjs/testing';
import { GestionReseñasController } from './gestion-reseñas.controller';
import { GestionReseñasService } from './gestion-reseñas.service';

describe('GestionReseñasController', () => {
  let controller: GestionReseñasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionReseñasController],
      providers: [GestionReseñasService],
    }).compile();

    controller = module.get<GestionReseñasController>(GestionReseñasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
