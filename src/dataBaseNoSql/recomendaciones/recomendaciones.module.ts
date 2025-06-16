import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecomendacionesService } from './recomendaciones.service';
import { Recomendaciones, RecomendacionesSchema } from './entities/recomendaciones.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recomendaciones.name, schema: RecomendacionesSchema }]),
  ],
  providers: [RecomendacionesService],
  exports: [RecomendacionesService],
})
export class RecomendacionesModule {} 