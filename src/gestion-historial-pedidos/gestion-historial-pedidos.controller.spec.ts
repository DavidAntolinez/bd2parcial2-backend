import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistorialPedidosController } from './gestion-historial-pedidos.controller';
import { GestionHistorialPedidosService } from './gestion-historial-pedidos.service';

describe('GestionHistorialPedidosController', () => {
  let controller: GestionHistorialPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionHistorialPedidosController],
      providers: [GestionHistorialPedidosService],
    }).compile();

    controller = module.get<GestionHistorialPedidosController>(GestionHistorialPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
