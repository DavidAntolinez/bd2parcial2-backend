import { Test, TestingModule } from '@nestjs/testing';
import { GestionReservasController } from './gestion-reservas.controller';
import { GestionReservasService } from './gestion-reservas.service';

describe('GestionReservasController', () => {
  let controller: GestionReservasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GestionReservasController],
      providers: [GestionReservasService],
    }).compile();

    controller = module.get<GestionReservasController>(GestionReservasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
