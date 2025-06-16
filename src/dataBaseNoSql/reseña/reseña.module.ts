import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReseñaService } from './reseña.service';
import { Reseña, ReseñaSchema } from './entities/reseña.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reseña.name, schema: ReseñaSchema }]),
  ],
  providers: [ReseñaService],
  exports: [ReseñaService],
})
export class ReseñaModule {} 