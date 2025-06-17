import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialPedidosService } from './historial-pedidos.service';
import { HistorialPedidos, HistorialPedidosSchema } from './entities/historial-pedidos.entity';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';
import { ClientesModule } from 'src/dataBaseSql/clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HistorialPedidos.name, schema: HistorialPedidosSchema }]),
    PlatosModule,
    ClientesModule
  ],
  providers: [HistorialPedidosService],
  exports: [HistorialPedidosService],
})
export class HistorialPedidosModule {} 