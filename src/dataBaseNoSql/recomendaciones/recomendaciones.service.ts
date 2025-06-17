import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recomendaciones, RecomendacionesDocument } from './entities/recomendaciones.entity';
import { CreateRecomendacionesDto } from './dto/create-recomendaciones.dto';
import { ClientesService } from 'src/dataBaseSql/clientes/clientes.service';
import { PlatosService } from 'src/dataBaseSql/platos/platos.service';
import { PreferenciasService } from '../preferencias/preferencias.service';

@Injectable()
export class RecomendacionesService {
  constructor(
    @InjectModel(Recomendaciones.name)
    private recomendacionesModel: Model<RecomendacionesDocument>,
    private readonly clientesService: ClientesService,
    private readonly platosService: PlatosService,
    private readonly preferenciasService: PreferenciasService,
  ) {}

    async create(clienteId: number): Promise<Recomendaciones> {

    // Validar que el clienteId sea válido
    if (!clienteId || clienteId <= 0 || !Number.isInteger(clienteId)) {
      throw new BadRequestException('El ID del cliente debe ser un número entero positivo válido');
    }

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    // Crear las recomendaciones
    const recomendacion = await this.recomendacionAvanzada(clienteId, 10);

    const recomendacionExistente = await this.recomendacionesModel.findOne({ clienteId: clienteId }).exec();
    if (recomendacionExistente) {
      // Crear un Set de IDs de platos ya existentes para verificación rápida
      const platosExistentesIds = new Set(
        recomendacionExistente.platosRecomendados.map(plato => plato.platoId)
      );
      
      // Filtrar solo los platos nuevos que no existen ya
      const platosNuevos = recomendacion.platosRecomendados.filter(
        platoNuevo => !platosExistentesIds.has(platoNuevo.platoId)
      );
      
      // Solo agregar platos nuevos (sin duplicados)
      recomendacionExistente.platosRecomendados = [
        ...recomendacionExistente.platosRecomendados, 
        ...platosNuevos
      ];
      
      return await recomendacionExistente.save();
    }

    const nuevaRecomendacion = new this.recomendacionesModel(recomendacion);
    return await nuevaRecomendacion.save();
  }

  async recomendacion(clienteId: number): Promise<CreateRecomendacionesDto> {
    const platos = await this.platosService.findAll();
    const preferencia = await this.preferenciasService.findByClienteId(clienteId);

    // Filtrar platos basándose en intolerancias y preferencias
    const platosRecomendados = platos.filter(plato => {
      // 1. Verificar intolerancias - EXCLUIR platos que contengan intolerancias del cliente
      if (preferencia.intolerancias && preferencia.intolerancias.length > 0) {
        // Si el cliente tiene intolerancia a lactosa, excluir platos con lactosa
        if (preferencia.intolerancias.includes('lactosa') && plato.tieneLactosa) {
          return false;
        }
        
        // Si el cliente tiene intolerancia a gluten, excluir platos con gluten
        if (preferencia.intolerancias.includes('gluten') && plato.tieneGluten) {
          return false;
        }
      }

      // 2. Verificar preferencias - INCLUIR platos que coincidan con las preferencias
      if (preferencia.preferencias && preferencia.preferencias.length > 0) {
        // Si el cliente prefiere comida vegana, incluir solo platos veganos
        if (preferencia.preferencias.includes('vegano') && !plato.esVegano) {
          return false;
        }
        
        // Si el cliente prefiere comida vegetariana, incluir solo platos vegetarianos o veganos
        if (preferencia.preferencias.includes('vegetariano') && !plato.esVegetariano && !plato.esVegano) {
          return false;
        }
      }

      // 3. Solo incluir platos disponibles
      return plato.disponible;
    });

    // Mapear los platos filtrados al formato del DTO
    const platosRecomendadosDto = platosRecomendados.map(plato => ({
      platoId: plato.id,
      platoNombre: plato.nombre
    }));

    // Crear y retornar la recomendación
    const recomendaciones = new CreateRecomendacionesDto();
    recomendaciones.clienteId = clienteId;
    recomendaciones.platosRecomendados = platosRecomendadosDto;

    return recomendaciones;
  }

  async findAll(): Promise<Recomendaciones[]> {
    return await this.recomendacionesModel.find().exec();
  }

  async findByClienteId(clienteId: number): Promise<Recomendaciones> {

    // Validar que el clienteId sea válido
    if (!clienteId || clienteId <= 0 || !Number.isInteger(clienteId)) {
      throw new BadRequestException('El ID del cliente debe ser un número entero positivo válido');
    }

    const recomendacion = await this.recomendacionesModel.findOne({ clienteId }).exec();
    
    if (!recomendacion) {
      throw new NotFoundException(`Recomendación con ID ${clienteId} no encontrada`);
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

  /**
   * Genera recomendaciones y las guarda en la base de datos
   * @param clienteId ID del cliente
   * @returns Recomendaciones guardadas
   */
  async generarYGuardarRecomendaciones(clienteId: number): Promise<Recomendaciones> {
    try {
      // Verificar si ya existen recomendaciones para este cliente
      const recomendacionExistente = await this.recomendacionesModel.findOne({ clienteId }).exec();
      
      // Generar nuevas recomendaciones
      const nuevasRecomendaciones = await this.recomendacion(clienteId);
      
      if (recomendacionExistente) {
        // Crear un Set de IDs de platos ya existentes para verificación rápida
        const platosExistentesIds = new Set(
          recomendacionExistente.platosRecomendados.map(plato => plato.platoId)
        );
        
        // Filtrar solo los platos nuevos que no existen ya
        const platosNuevos = nuevasRecomendaciones.platosRecomendados.filter(
          platoNuevo => !platosExistentesIds.has(platoNuevo.platoId)
        );
        
        // Solo agregar platos nuevos (sin duplicados)
        recomendacionExistente.platosRecomendados = [
          ...recomendacionExistente.platosRecomendados, 
          ...platosNuevos
        ];
        
        return await recomendacionExistente.save();
      } else {
        // Crear nuevas recomendaciones
        const recomendacion = new this.recomendacionesModel(nuevasRecomendaciones);
        return await recomendacion.save();
      }
    } catch (error) {
      throw new NotFoundException(`Error generando recomendaciones para cliente ${clienteId}: ${error.message}`);
    }
  }

  /**
   * Algoritmo avanzado de recomendación con puntuación
   * @param clienteId ID del cliente
   * @param limite Número máximo de recomendaciones (default: 10)
   * @returns Recomendaciones ordenadas por puntuación
   */
  async recomendacionAvanzada(clienteId: number, limite: number = 10): Promise<CreateRecomendacionesDto> {
    const platos = await this.platosService.findAll();
    const preferencia = await this.preferenciasService.findByClienteId(clienteId);

    // Filtrar y puntuar platos
    const platosConPuntuacion = platos
      .filter(plato => plato.disponible) // Solo platos disponibles
      .map(plato => {
        let puntuacion = 0;

        // PENALIZACIONES por intolerancias (elimina el plato si no pasa)
        if (preferencia.intolerancias && preferencia.intolerancias.length > 0) {
          if (preferencia.intolerancias.includes('lactosa') && plato.tieneLactosa) {
            return null; // Eliminar completamente
          }
          if (preferencia.intolerancias.includes('gluten') && plato.tieneGluten) {
            return null; // Eliminar completamente
          }
        }

        // BONIFICACIONES por preferencias
        if (preferencia.preferencias && preferencia.preferencias.length > 0) {
          if (preferencia.preferencias.includes('vegano') && plato.esVegano) {
            puntuacion += 10; // Bonificación alta para veganos
          }
          if (preferencia.preferencias.includes('vegetariano')) {
            if (plato.esVegetariano) puntuacion += 8;
            if (plato.esVegano) puntuacion += 10; // Los veganos también son vegetarianos
          }
        }

        // Bonificaciones adicionales
        if (plato.esVegano) puntuacion += 2; // Bonificación por ser saludable
        if (plato.esVegetariano) puntuacion += 1;

        return {
          plato,
          puntuacion
        };
      })
      .filter(item => item !== null) // Remover platos eliminados por intolerancias
      .sort((a, b) => b.puntuacion - a.puntuacion) // Ordenar por puntuación descendente
      .slice(0, limite) // Limitar resultados
      .map(item => ({
        platoId: item.plato.id,
        platoNombre: item.plato.nombre
      }));

    const recomendaciones = new CreateRecomendacionesDto();
    recomendaciones.clienteId = clienteId;
    recomendaciones.platosRecomendados = platosConPuntuacion;

    return recomendaciones;
  }

  /**
   * Obtiene estadísticas de las recomendaciones
   * @param clienteId ID del cliente
   * @returns Estadísticas de recomendaciones
   */
  async obtenerEstadisticas(clienteId: number) {
    const recomendaciones = await this.recomendacion(clienteId);
    const preferencia = await this.preferenciasService.findByClienteId(clienteId);
    const todosLosPlatos = await this.platosService.findAll();

    return {
      clienteId,
      totalPlatosDisponibles: todosLosPlatos.filter(p => p.disponible).length,
      totalPlatosRecomendados: recomendaciones.platosRecomendados.length,
      intolerancias: preferencia.intolerancias || [],
      preferencias: preferencia.preferencias || [],
      porcentajeCobertura: Math.round(
        (recomendaciones.platosRecomendados.length / todosLosPlatos.filter(p => p.disponible).length) * 100
      )
         };
   }

  /**
   * Limpia duplicados de una recomendación existente
   * @param clienteId ID del cliente
   * @returns Recomendación sin duplicados
   */
  async limpiarDuplicados(clienteId: number): Promise<Recomendaciones> {
    const recomendacion = await this.recomendacionesModel.findOne({ clienteId }).exec();
    
    if (!recomendacion) {
      throw new NotFoundException(`Recomendación para cliente ${clienteId} no encontrada`);
    }

    // Crear un Map para eliminar duplicados basándose en platoId
    const platosUnicos = new Map();
    
    recomendacion.platosRecomendados.forEach(plato => {
      if (!platosUnicos.has(plato.platoId)) {
        platosUnicos.set(plato.platoId, plato);
      }
    });

    // Convertir el Map de vuelta a array
    recomendacion.platosRecomendados = Array.from(platosUnicos.values());
    
    return await recomendacion.save();
  }

  /**
   * Reemplaza completamente las recomendaciones (sin agregar, reemplaza)
   * @param clienteId ID del cliente
   * @returns Recomendaciones reemplazadas
   */
  async reemplazarRecomendaciones(clienteId: number): Promise<Recomendaciones> {
    const recomendacionExistente = await this.recomendacionesModel.findOne({ clienteId }).exec();
    const nuevasRecomendaciones = await this.recomendacion(clienteId);
    
    if (recomendacionExistente) {
      // Reemplazar completamente (no agregar)
      recomendacionExistente.platosRecomendados = nuevasRecomendaciones.platosRecomendados;
      return await recomendacionExistente.save();
    } else {
      // Crear nuevas recomendaciones
      const recomendacion = new this.recomendacionesModel(nuevasRecomendaciones);
      return await recomendacion.save();
    }
  }

  /**
   * Elimina un plato específico de las recomendaciones
   * @param clienteId ID del cliente
   * @param platoId ID del plato a eliminar
   * @returns Recomendación actualizada
   */
  async eliminarPlatoDeRecomendaciones(clienteId: number, platoId: number): Promise<Recomendaciones> {
    const recomendacion = await this.recomendacionesModel.findOne({ clienteId }).exec();
    
    if (!recomendacion) {
      throw new NotFoundException(`Recomendación para cliente ${clienteId} no encontrada`);
    }

    // Filtrar el plato a eliminar
    const platosActualizados = recomendacion.platosRecomendados.filter(
      plato => plato.platoId !== platoId
    );

    recomendacion.platosRecomendados = platosActualizados;
    return await recomendacion.save();
  }
} 