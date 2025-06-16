import { Test, TestingModule } from '@nestjs/testing';
import { GestionPlatosController } from './gestion-platos.controller';
import { GestionPlatosService } from './gestion-platos.service';

describe('GestionPlatosController', () => {
  let controller: GestionPlatosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionPlatosController],
      providers: [GestionPlatosService],
    }).compile();

    controller = module.get<GestionPlatosController>(GestionPlatosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
