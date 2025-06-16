import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    ClientesModule,
  ],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {} 