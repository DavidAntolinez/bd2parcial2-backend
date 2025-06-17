import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HistorialPedidosDocument = HistorialPedidos & Document;

// Sub-schema para los platos del historial
@Schema({ _id: false })
export class PlatoHistorial {
  @Prop({ required: true, type: Number })
  platoId: number;

  @Prop({ required: true, type: String })
  platoNombre: string;

  @Prop({ required: true, type: String })
  observacion: string;
}

const PlatoHistorialSchema = SchemaFactory.createForClass(PlatoHistorial);

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'HistorialPedidos',
})
export class HistorialPedidos {

  @Prop({ required: true, type: Number })
  clienteId: number;

  @Prop({ required: true, type: Date })
  fecha: Date;

  @Prop({ type: [PlatoHistorialSchema], default: [] })
  platos: PlatoHistorial[];
}

export const HistorialPedidosSchema = SchemaFactory.createForClass(HistorialPedidos); 