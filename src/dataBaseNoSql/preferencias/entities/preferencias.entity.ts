import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { INTOLERANCIAS_PERMITIDAS } from '../constants/intolerancias.constants';
import { PREFERENCIAS_PERMITIDAS } from '../constants/preferencias.constants';

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

  @Prop({ 
    required: false, 
    type: [String], 
    default: [],
    validate: {
      validator: function(intolerancias: string[]) {
        return intolerancias.every(intolerancia => INTOLERANCIAS_PERMITIDAS.includes(intolerancia as any));
      },
      message: `Las intolerancias solo pueden ser: ${INTOLERANCIAS_PERMITIDAS.join(', ')}`
    }
  })
  intolerancias: string[];

  @Prop({ 
    required: false, 
    type: [String], 
    default: [],
    validate: {
      validator: function(preferencias: string[]) {
        return preferencias.every(preferencias => PREFERENCIAS_PERMITIDAS.includes(preferencias as any));
      },
      message: `Las preferencias solo pueden ser: ${PREFERENCIAS_PERMITIDAS.join(', ')}`
    }
  })
  preferencias: string[];

  @Prop({ required: false, type: [PlatoSchema], default: [] })
  platosFavoritos: Plato[];
}

export const PreferenciasSchema = SchemaFactory.createForClass(Preferencias); 