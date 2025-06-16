import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReseñaService } from './reseña.service';
import { Reseña, ReseñaSchema } from './entities/reseña.entity';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reseña.name, schema: ReseñaSchema }]),
    PlatosModule,
  ],
  providers: [ReseñaService],
  exports: [ReseñaService],
})
export class ReseñaModule {} 