import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasService } from './reservas.service';
import { Reserva } from './entities/reserva.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
    ClientesModule,
  ],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {} 