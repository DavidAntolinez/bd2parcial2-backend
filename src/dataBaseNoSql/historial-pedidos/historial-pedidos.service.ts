import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistorialPedidos, HistorialPedidosDocument } from './entities/historial-pedidos.entity';

@Injectable()
export class HistorialPedidosService {
  constructor(
    @InjectModel(HistorialPedidos.name)
    private historialPedidosModel: Model<HistorialPedidosDocument>,
  ) {}

  async create(id: string): Promise<HistorialPedidos> {
    const nuevoHistorial = new this.historialPedidosModel({ id });
    return await nuevoHistorial.save();
  }

  async findAll(): Promise<HistorialPedidos[]> {
    return await this.historialPedidosModel.find().exec();
  }

  async findOne(id: string): Promise<HistorialPedidos> {
    const historial = await this.historialPedidosModel.findOne({ id }).exec();
    
    if (!historial) {
      throw new NotFoundException(`Historial de pedidos con ID ${id} no encontrado`);
    }
    
    return historial;
  }

  async update(id: string, updateData: Partial<HistorialPedidos>): Promise<HistorialPedidos> {
    const historialActualizado = await this.historialPedidosModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
    
    if (!historialActualizado) {
      throw new NotFoundException(`Historial de pedidos con ID ${id} no encontrado`);
    }
    
    return historialActualizado;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.historialPedidosModel.deleteOne({ id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Historial de pedidos con ID ${id} no encontrado`);
    }
  }
} 