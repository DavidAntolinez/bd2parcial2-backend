import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecomendacionesService } from './recomendaciones.service';
import { Recomendaciones, RecomendacionesSchema } from './entities/recomendaciones.entity';
import { ClientesModule } from 'src/dataBaseSql/clientes/clientes.module';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';
import { PreferenciasModule } from '../preferencias/preferencias.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recomendaciones.name, schema: RecomendacionesSchema }]),
    ClientesModule,
    PlatosModule,
    PreferenciasModule,
  ],
  providers: [RecomendacionesService],
  exports: [RecomendacionesService],
})
export class RecomendacionesModule {} 