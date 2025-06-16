import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReseñaDocument = Reseña & Document;

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'Reseñas',
})
export class Reseña {
  @Prop({ required: true, unique: true })
  id: string;
}

export const ReseñaSchema = SchemaFactory.createForClass(Reseña); 