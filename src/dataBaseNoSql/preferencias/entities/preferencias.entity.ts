import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PreferenciasDocument = Preferencias & Document;

// Sub-schema para los platos
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
  collection: 'Preferencias',
})
export class Preferencias {

  @Prop({ required: true, type: Number, unique: true })
  clienteId: number;

  @Prop({ required: false, type: [String], default: [] })
  intolerancias: string[];

  @Prop({ required: false, type: [String], default: [] })
  preferencias: string[];

  @Prop({ required: false, type: [PlatoSchema], default: [] })
  platosFavoritos: Plato[];
}

export const PreferenciasSchema = SchemaFactory.createForClass(Preferencias); 