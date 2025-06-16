import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecomendacionesDocument = Recomendaciones & Document;

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'Recomendaciones',
})
export class Recomendaciones {
 
}

export const RecomendacionesSchema = SchemaFactory.createForClass(Recomendaciones); 