import { Test, TestingModule } from '@nestjs/testing';
import { GestionPedidosController } from './gestion-pedidos.controller';
import { GestionPedidosService } from './gestion-pedidos.service';

describe('GestionPedidosController', () => {
  let controller: GestionPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionPedidosController],
      providers: [GestionPedidosService],
    }).compile();

    controller = module.get<GestionPedidosController>(GestionPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
