import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistorialPedidosDocument = HistorialPedidos & Document;

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'HistorialPedidos',
})
export class HistorialPedidos {
  @Prop({ required: true, unique: true })
  id: string;
}

export const HistorialPedidosSchema = SchemaFactory.createForClass(HistorialPedidos); 