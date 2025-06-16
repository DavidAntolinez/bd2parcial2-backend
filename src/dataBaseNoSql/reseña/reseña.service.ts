import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reseña, ReseñaDocument } from './entities/reseña.entity';

@Injectable()
export class ReseñaService {
  constructor(
    @InjectModel(Reseña.name)
    private reseñaModel: Model<ReseñaDocument>,
  ) {}

  async create(id: string): Promise<Reseña> {
    const nuevaReseña = new this.reseñaModel({ id });
    return await nuevaReseña.save();
  }

  async findAll(): Promise<Reseña[]> {
    return await this.reseñaModel.find().exec();
  }

  async findOne(id: string): Promise<Reseña> {
    const reseña = await this.reseñaModel.findOne({ id }).exec();
    
    if (!reseña) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
    
    return reseña;
  }

  async update(id: string, updateData: Partial<Reseña>): Promise<Reseña> {
    const reseñaActualizada = await this.reseñaModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
    
    if (!reseñaActualizada) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
    
    return reseñaActualizada;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.reseñaModel.deleteOne({ id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Reseña con ID ${id} no encontrada`);
    }
  }
} 