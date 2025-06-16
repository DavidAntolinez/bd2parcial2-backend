import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferenciasService } from './preferencias.service';
import { Preferencias, PreferenciasSchema } from './entities/preferencias.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Preferencias.name, schema: PreferenciasSchema }]),
  ],
  providers: [PreferenciasService],
  exports: [PreferenciasService],
})
export class PreferenciasModule {} 