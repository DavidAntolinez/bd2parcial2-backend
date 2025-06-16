import { Module } from '@nestjs/common';
import { GestionReservasService } from './gestion-reservas.service';
import { GestionReservasController } from './gestion-reservas.controller';
import { ReservasModule } from 'src/dataBaseSql/reservas/reservas.module';
import { MesasModule } from 'src/dataBaseSql/mesas/mesas.module';

@Module({
  imports: [ReservasModule, MesasModule],
  controllers: [GestionReservasController],
  providers: [GestionReservasService],
})
export class GestionReservasModule {}
