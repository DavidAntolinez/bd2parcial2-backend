import { Module } from '@nestjs/common';
import { GestionPedidosService } from './gestion-pedidos.service';
import { GestionPedidosController } from './gestion-pedidos.controller';
import { PedidosModule } from 'src/dataBaseSql/pedidos/pedidos.module';

@Module({
  imports: [PedidosModule],
  controllers: [GestionPedidosController],
  providers: [GestionPedidosService],
})
export class GestionPedidosModule {}
