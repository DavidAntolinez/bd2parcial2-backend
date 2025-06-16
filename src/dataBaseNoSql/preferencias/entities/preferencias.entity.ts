import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PreferenciasDocument = Preferencias & Document;

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'Preferencias',
})
export class Preferencias {
  @Prop({ required: true, unique: true })
  id: string;
}

export const PreferenciasSchema = SchemaFactory.createForClass(Preferencias); 