import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialPedidosService } from './historial-pedidos.service';
import { HistorialPedidos, HistorialPedidosSchema } from './entities/historial-pedidos.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HistorialPedidos.name, schema: HistorialPedidosSchema }]),
  ],
  providers: [HistorialPedidosService],
  exports: [HistorialPedidosService],
})
export class HistorialPedidosModule {} 