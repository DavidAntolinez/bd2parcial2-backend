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

  async create(id: string): Promise<Recomendaciones> {
    const nuevaRecomendacion = new this.recomendacionesModel({ id });
    return await nuevaRecomendacion.save();
  }

  async findAll(): Promise<Recomendaciones[]> {
    return await this.recomendacionesModel.find().exec();
  }

  async findOne(id: string): Promise<Recomendaciones> {
    const recomendacion = await this.recomendacionesModel.findOne({ id }).exec();
    
    if (!recomendacion) {
      throw new NotFoundException(`Recomendación con ID ${id} no encontrada`);
    }
    
    return recomendacion;
  }

  async update(id: string, updateData: Partial<Recomendaciones>): Promise<Recomendaciones> {
    const recomendacionActualizada = await this.recomendacionesModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
    
    if (!recomendacionActualizada) {
      throw new NotFoundException(`Recomendación con ID ${id} no encontrada`);
    }
    
    return recomendacionActualizada;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.recomendacionesModel.deleteOne({ id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Recomendación con ID ${id} no encontrada`);
    }
  }
} 