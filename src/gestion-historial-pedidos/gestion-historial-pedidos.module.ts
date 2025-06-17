import { Module } from '@nestjs/common';
import { GestionHistorialPedidosService } from './gestion-historial-pedidos.service';
import { GestionHistorialPedidosController } from './gestion-historial-pedidos.controller';
import { HistorialPedidosModule } from 'src/dataBaseNoSql/historial-pedidos/historial-pedidos.module';

@Module({
  imports: [HistorialPedidosModule],
  controllers: [GestionHistorialPedidosController],
  providers: [GestionHistorialPedidosService],
})
export class GestionHistorialPedidosModule {}
