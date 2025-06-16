import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recomendaciones, RecomendacionesDocument } from './entities/recomendaciones.entity';

@Injectable()
export class RecomendacionesService {
  constructor(
    @InjectModel(Recomendaciones.name)
    private recomendacionesModel: Model<RecomendacionesDocument>,
  ) {}

    async create(_id: string): Promise<Recomendaciones> {
    const nuevaRecomendacion = new this.recomendacionesModel({ _id });
    return await nuevaRecomendacion.save();
  }

  async findAll(): Promise<Recomendaciones[]> {
    return await this.recomendacionesModel.find().exec();
  }

  async findById(_id: string): Promise<Recomendaciones> {
    const recomendacion = await this.recomendacionesModel.findOne({ _id }).exec();
    
    if (!recomendacion) {
      throw new NotFoundException(`Recomendación con ID ${_id} no encontrada`);
    }
    
    return recomendacion;
  }

  async update(_id: string, updateData: Partial<Recomendaciones>): Promise<Recomendaciones> {
    const recomendacionActualizada = await this.recomendacionesModel
      .findOneAndUpdate({ _id }, updateData, { new: true })
      .exec();
    
    if (!recomendacionActualizada) {
      throw new NotFoundException(`Recomendación con ID ${_id} no encontrada`);
    }
    
    return recomendacionActualizada;
  }

  async remove(_id: string): Promise<void> {
    const resultado = await this.recomendacionesModel.deleteOne({ _id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Recomendación con ID ${_id} no encontrada`);
    }
  }
} 