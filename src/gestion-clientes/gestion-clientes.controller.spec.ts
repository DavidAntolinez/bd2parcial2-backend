import { Test, TestingModule } from '@nestjs/testing';
import { GestionClientesController } from './gestion-clientes.controller';
import { GestionClientesService } from './gestion-clientes.service';

describe('GestionClientesController', () => {
  let controller: GestionClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionClientesController],
      providers: [GestionClientesService],
    }).compile();

    controller = module.get<GestionClientesController>(GestionClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
