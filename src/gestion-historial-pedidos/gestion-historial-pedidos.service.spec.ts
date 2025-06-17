import { Test, TestingModule } from '@nestjs/testing';
import { GestionHistorialPedidosService } from './gestion-historial-pedidos.service';

describe('GestionHistorialPedidosService', () => {
  let service: GestionHistorialPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionHistorialPedidosService],
    }).compile();

    service = module.get<GestionHistorialPedidosService>(GestionHistorialPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
