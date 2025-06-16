import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReseñaDocument = Reseña & Document;

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
  collection: 'Reseñas',
})
export class Reseña {

  @Prop({ 
    required: true, 
    type: Number, 
    min: 1, 
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Las estrellas deben ser un número entero'
    }
  })
  estrellas: number;

  @Prop({ required: true, type: String })
  comentarioLibre: string;

  @Prop({ required: true, type: String })
  tipoVisita: string;

  @Prop({ required: true, type: Date })
  fecha: Date;

  @Prop({ type: [PlatoSchema], default: [] })
  platos: Plato[];
}

export const ReseñaSchema = SchemaFactory.createForClass(Reseña); 