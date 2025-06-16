import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reseña, ReseñaDocument } from './entities/reseña.entity';
import { CreateReseñaDto } from './dto/create-reseña.dto';
import { UpdateReseñaDto } from './dto/update-reseña.dto';
import { PlatosService } from 'src/dataBaseSql/platos/platos.service';

@Injectable()
export class ReseñaService {
  constructor(
    @InjectModel(Reseña.name)
    private reseñaModel: Model<ReseñaDocument>,
    private readonly platosService: PlatosService,
  ) {}

  async create(createReseñaDto: CreateReseñaDto): Promise<Reseña> {
    // Convertir la fecha string a Date si es necesario
    const reseñaData = {
      ...createReseñaDto,
      fecha: new Date(createReseñaDto.fecha),
    };
    
    // Verificar que los platos existen
    for (const platoInfo of createReseñaDto.platos) {
      const plato = await this.platosService.findOne(platoInfo.platoId);
      if (!plato ) {
        throw new NotFoundException(`Plato con ID ${platoInfo.platoId} no encontrado`);
      }else if (plato.nombre !== platoInfo.platoNombre) {
        throw new NotFoundException(`Los nombres de los platos no coinciden`);
      }
    }

    const nuevaReseña = new this.reseñaModel(reseñaData);
    return await nuevaReseña.save();
  }

  async findAll(): Promise<Reseña[]> {
    return await this.reseñaModel.find().exec();
  }

  async findById(_id: string): Promise<Reseña> {
      const reseña = await this.reseñaModel.findById(_id).exec();
    
    if (!reseña) {
      throw new NotFoundException(`Reseña con ID ${_id} no encontrada`);
    }
    
    return reseña;
  }

  async update(_id: string, updateReseñaDto: UpdateReseñaDto): Promise<Reseña> {
    // Convertir la fecha string a Date si está presente
    const updateData = updateReseñaDto.fecha 
      ? { ...updateReseñaDto, fecha: new Date(updateReseñaDto.fecha) }
      : updateReseñaDto;

    const reseñaActualizada = await this.reseñaModel
      .findOneAndUpdate({ _id }, updateData, { new: true })
      .exec();
    
    if (!reseñaActualizada) {
      throw new NotFoundException(`Reseña con ID ${_id} no encontrada`);
    }
    
    return reseñaActualizada;
  }

  async remove(_id: string): Promise<void> {
    const resultado = await this.reseñaModel.deleteOne({ _id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Reseña con ID ${_id} no encontrada`);
    }
  }

  // Métodos adicionales específicos para reseñas
  async findByEstrellas(estrellas: number): Promise<Reseña[]> {
    
    if(isNaN(estrellas)) {
      throw new NotFoundException(`Las estrellas deben ser un número`);
    }
    
    if (estrellas < 1 || estrellas > 5) {
      throw new NotFoundException(`Las estrellas deben estar entre 1 y 5`);
    }

    return await this.reseñaModel.find({ estrellas: estrellas }).exec();
  }

  async findByTipoVisita(tipoVisita: string): Promise<Reseña[]> {
    return await this.reseñaModel.find({ tipoVisita: tipoVisita }).exec();
  }

  async findByPlato(nombrePlato: string): Promise<Reseña[]> {
    return await this.reseñaModel.find({ 'platos.platoNombre': nombrePlato }).exec();
  }

} 