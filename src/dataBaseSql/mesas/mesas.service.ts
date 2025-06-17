import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Mesa } from './entities/mesa.entity';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesasService {
  constructor(
    @InjectRepository(Mesa)
    private mesasRepository: Repository<Mesa>,
  ) {}

  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    const mesa = this.mesasRepository.create(createMesaDto);
    return await this.mesasRepository.save(mesa);
  }

  async findAll(): Promise<Mesa[]> {
    return await this.mesasRepository.find({
      relations: ['reservas'],
    });
  }

  async findOne(id: number): Promise<Mesa> {
    const mesa = await this.mesasRepository.findOne({
      where: { id },
      relations: ['reservas'],
    });

    if (!mesa) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    }

    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    const mesa = await this.findOne(id);
    
    Object.assign(mesa, updateMesaDto);
    return await this.mesasRepository.save(mesa);
  }

  async remove(id: number): Promise<void> {
    const mesa = await this.findOne(id);
    await this.mesasRepository.remove(mesa);
  }

  async findByCapacidad(capacidad: number): Promise<Mesa[]> {
    return await this.mesasRepository.find({
      where: { capacidad },
      relations: ['reservas'],
    });
  }

  async findByUbicacion(ubicacion: string): Promise<Mesa[]> {
    return await this.mesasRepository.find({
      where: { ubicacion },
      relations: ['reservas'],
    });
  }

} 