import { Test, TestingModule } from '@nestjs/testing';
import { GestionClientesService } from './gestion-clientes.service';

describe('GestionClientesService', () => {
  let service: GestionClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GestionClientesService],
    }).compile();

    service = module.get<GestionClientesService>(GestionClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
