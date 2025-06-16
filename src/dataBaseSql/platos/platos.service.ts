import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plato } from './entities/plato.entity';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';

@Injectable()
export class PlatosService {
  constructor(
    @InjectRepository(Plato)
    private platosRepository: Repository<Plato>,
  ) {}

  async create(createPlatoDto: CreatePlatoDto): Promise<Plato> {
    const plato = this.platosRepository.create(createPlatoDto);
    return await this.platosRepository.save(plato);
  }

  async findAll(): Promise<Plato[]> {
    return await this.platosRepository.find();
  }

  async findOne(id: number): Promise<Plato> {
    const plato = await this.platosRepository.findOne({
      where: { id },
    });

    if (!plato) {
      throw new NotFoundException(`Plato con ID ${id} no encontrado`);
    }

    return plato;
  }

  async update(id: number, updatePlatoDto: UpdatePlatoDto): Promise<Plato> {
    const plato = await this.findOne(id);
    
    Object.assign(plato, updatePlatoDto);
    return await this.platosRepository.save(plato);
  }

  async remove(id: number): Promise<void> {
    const plato = await this.findOne(id);
    await this.platosRepository.remove(plato);
  }

  async findByCategoria(categoria: string): Promise<Plato[]> {
    return await this.platosRepository.find({
      where: { categoria },
    });
  }

  async findDisponibles(): Promise<Plato[]> {
    return await this.platosRepository.find({
      where: { disponible: true },
    });
  }

  async findByPrecio(precio: number): Promise<Plato[]> {
    return await this.platosRepository.find({
      where: { precio },
    });
  }

  async findByIds(ids: number[]): Promise<Plato[]> {
    return await this.platosRepository.findByIds(ids);
  }
} 