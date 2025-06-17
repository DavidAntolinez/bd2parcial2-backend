import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistorialPedidos, HistorialPedidosDocument } from './entities/historial-pedidos.entity';
import { CreateHistorialPedidosDto } from './dto/create-historial-pedidos.dto';
import { UpdateHistorialPedidosDto } from './dto/update-historial-pedidos.dto';
import { PlatosService } from 'src/dataBaseSql/platos/platos.service';
import { ClientesService } from 'src/dataBaseSql/clientes/clientes.service';

@Injectable()
export class HistorialPedidosService {
  constructor(
    @InjectModel(HistorialPedidos.name)
    private historialPedidosModel: Model<HistorialPedidosDocument>,
    private readonly platosService: PlatosService,
    private readonly clientesService: ClientesService,
  ) {}

  async create(createHistorialPedidosDto: CreateHistorialPedidosDto): Promise<HistorialPedidos> {

    const historialExistente = await this.historialPedidosModel.findOne({ clienteId: createHistorialPedidosDto.clienteId }).exec();
    if (historialExistente) {
      throw new BadRequestException('Ya existe un historial de pedidos para este cliente');
    }

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(createHistorialPedidosDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${createHistorialPedidosDto.clienteId} no encontrado`);
    }

    // Verificar que los platos existen y que los nombres coinciden
      if (createHistorialPedidosDto.platos && createHistorialPedidosDto.platos.length > 0) {
      for (const platoInfo of createHistorialPedidosDto.platos) {
        const plato = await this.platosService.findOne(platoInfo.platoId);
        if (!plato ) {
          throw new NotFoundException(`Plato con ID ${platoInfo.platoId} no encontrado`);
        }else if (plato.nombre !== platoInfo.platoNombre) {
          throw new NotFoundException(`Los nombres de los platos no coinciden`);
        }
      }
    }

    // Convertir la fecha string a Date
    const historialData = {
      ...createHistorialPedidosDto,
      fecha: new Date(createHistorialPedidosDto.fecha),
    };
    
    const nuevoHistorial = new this.historialPedidosModel(historialData);
    return await nuevoHistorial.save();
  }

  async findAll(): Promise<HistorialPedidos[]> {
    return await this.historialPedidosModel.find().exec();
  }

  async findById(_id: string): Promise<HistorialPedidos> {
    const historial = await this.historialPedidosModel.findOne({ _id }).exec();
    
    if (!historial) {
      throw new NotFoundException(`Historial de pedidos con ID ${_id} no encontrado`);
    }
    
    return historial;
  }

  async update(id: string, updateHistorialPedidosDto: UpdateHistorialPedidosDto): Promise<HistorialPedidos> {
    // Convertir la fecha string a Date si está presente
    const updateData = updateHistorialPedidosDto.fecha 
      ? { ...updateHistorialPedidosDto, fecha: new Date(updateHistorialPedidosDto.fecha) }
      : updateHistorialPedidosDto;
      
    const historialActualizado = await this.historialPedidosModel
      .findOneAndUpdate({ id }, updateData, { new: true })
      .exec();
    
    if (!historialActualizado) {
      throw new NotFoundException(`Historial de pedidos con ID ${id} no encontrado`);
    }
    
    return historialActualizado;
  }

  async updateById(_id: string, updateHistorialPedidosDto: UpdateHistorialPedidosDto): Promise<HistorialPedidos> {
    // Convertir la fecha string a Date si está presente
    const updateData = updateHistorialPedidosDto.fecha 
      ? { ...updateHistorialPedidosDto, fecha: new Date(updateHistorialPedidosDto.fecha) }
      : updateHistorialPedidosDto;

    const historialActualizado = await this.historialPedidosModel
      .findOneAndUpdate({ _id }, updateData, { new: true })
      .exec();
    
    if (!historialActualizado) {
      throw new NotFoundException(`Historial de pedidos con ID ${_id} no encontrado`);
    }
    
    return historialActualizado;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.historialPedidosModel.deleteOne({ id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Historial de pedidos con ID ${id} no encontrado`);
    }
  }

  async removeById(_id: string): Promise<void> {
    const resultado = await this.historialPedidosModel.deleteOne({ _id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Historial de pedidos con ID ${_id} no encontrado`);
    }
  }

  // Métodos específicos para el historial de pedidos
  async findByClienteId(clienteId: number): Promise<HistorialPedidos[]> {
    // Validar que el clienteId sea válido
    if (!clienteId || clienteId <= 0 || !Number.isInteger(clienteId)) {
      throw new BadRequestException('El ID del cliente debe ser un número entero positivo válido');
    }

    return await this.historialPedidosModel.find({ clienteId }).sort({ fecha: -1 }).exec();
  }

  async findByFechaRange(fechaInicio: Date, fechaFin: Date): Promise<HistorialPedidos[]> {
    return await this.historialPedidosModel
      .find({ 
        fecha: { 
          $gte: fechaInicio, 
          $lte: fechaFin 
        } 
      })
      .sort({ fecha: -1 })
      .exec();
  }

  async findByPlatoId(platoId: number): Promise<HistorialPedidos[]> {
    return await this.historialPedidosModel
      .find({ 'platos.platoId': platoId })
      .sort({ fecha: -1 })
      .exec();
  }

  async obtenerEstadisticasCliente(clienteId: number) {
    const historial = await this.findByClienteId(clienteId);
    
    if (historial.length === 0) {
      return {
        clienteId,
        totalPedidos: 0,
        platosMasPedidos: [],
        ultimoPedido: null,
        observacionesFrecuentes: []
      };
    }

    // Contar platos más pedidos
    const platosCounts = new Map();
    const observaciones = new Map();

    historial.forEach(pedido => {
      pedido.platos.forEach(plato => {
        // Contar platos
        platosCounts.set(
          plato.platoId, 
          (platosCounts.get(plato.platoId) || 0) + 1
        );

        // Contar observaciones (si no está vacía)
        if (plato.observacion && plato.observacion.trim()) {
          observaciones.set(
            plato.observacion, 
            (observaciones.get(plato.observacion) || 0) + 1
          );
        }
      });
    });

    // Convertir a arrays ordenados
    const platosMasPedidos = Array.from(platosCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([platoId, count]) => ({
        platoId,
        cantidadPedida: count,
        platoNombre: historial
          .flatMap(h => h.platos)
          .find(p => p.platoId === platoId)?.platoNombre || 'Desconocido'
      }));

    const observacionesFrecuentes = Array.from(observaciones.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([observacion, count]) => ({
        observacion,
        frecuencia: count
      }));

    return {
      clienteId,
      totalPedidos: historial.length,
      platosMasPedidos,
      ultimoPedido: historial[0], // Ya está ordenado por fecha descendente
      observacionesFrecuentes
    };
  }
} 