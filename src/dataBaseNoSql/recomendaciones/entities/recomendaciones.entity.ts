import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecomendacionesDocument = Recomendaciones & Document;

@Schema({ _id: false })
export class Plato {
  @Prop({ required: true, type: Number })
  platoId: number;

  @Prop({ required: true, type: String })
  platoNombre: string;
}

const PlatoSchema = SchemaFactory.createForClass(Plato);

@Schema({
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  collection: 'Recomendaciones',
})
export class Recomendaciones {
  @Prop({ required: true, type: Number, unique: true })
  clienteId: number;


  @Prop({ required: true, type: [PlatoSchema], default: [] })
  platosRecomendados: Plato[];
}

export const RecomendacionesSchema = SchemaFactory.createForClass(Recomendaciones); 