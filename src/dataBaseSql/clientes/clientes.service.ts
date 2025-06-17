import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clientesRepository.create(createClienteDto);
    return await this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clientesRepository.find({
      relations: ['pedidos', 'reservas'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({
      where: { id },
      relations: ['pedidos', 'reservas'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    
    Object.assign(cliente, updateClienteDto);
    return await this.clientesRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clientesRepository.remove(cliente);
  }

  async findByEmail(email: string): Promise<Cliente | null> {
    return await this.clientesRepository.findOne({
      where: { email },
      relations: ['pedidos', 'reservas'],
    });
  }

  async findByNombre(nombre: string): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOne({
      where: { nombre },
      relations: ['pedidos', 'reservas'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con nombre ${nombre} no encontrado`);
    }

    return cliente;
  }
} 