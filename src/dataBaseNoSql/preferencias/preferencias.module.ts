import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferenciasService } from './preferencias.service';
import { Preferencias, PreferenciasSchema } from './entities/preferencias.entity';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';
import { ClientesModule } from 'src/dataBaseSql/clientes/clientes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preferencias.name, schema: PreferenciasSchema }]),
    PlatosModule,
    ClientesModule,
  ],
  providers: [PreferenciasService],
  exports: [PreferenciasService],
})
export class PreferenciasModule {} 