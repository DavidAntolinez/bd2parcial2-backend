import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preferencias, PreferenciasDocument } from './entities/preferencias.entity';

@Injectable()
export class PreferenciasService {
  constructor(
    @InjectModel(Preferencias.name)
    private preferenciasModel: Model<PreferenciasDocument>,
  ) {}

  async create(id: string): Promise<Preferencias> {
    const nuevaPreferencia = new this.preferenciasModel({ id });
    return await nuevaPreferencia.save();
  }

  async findAll(): Promise<Preferencias[]> {
    return await this.preferenciasModel.find().exec();
  }

  async findOne(id: string): Promise<Preferencias> {
    const preferencia = await this.preferenciasModel.findOne({ id }).exec();
    
    if (!preferencia) {
      throw new NotFoundException(`Preferencia con ID ${id} no encontrada`);
    }
    
    return preferencia;
  }

  async update(id: string, updateData: Partial<Preferencias>): Promise<Preferencias> {
    const preferenciasActualizada = await this.preferenciasModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
    
    if (!preferenciasActualizada) {
      throw new NotFoundException(`Preferencia con ID ${id} no encontrada`);
    }
    
    return preferenciasActualizada;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.preferenciasModel.deleteOne({ id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Preferencia con ID ${id} no encontrada`);
    }
  }
} 