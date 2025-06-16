import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { PedidoPlato } from './entities/pedido-plato.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { PlatosModule } from '../platos/platos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoPlato]),
    ClientesModule,
    PlatosModule,
  ],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {} 