import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private reservasRepository: Repository<Reserva>,
    private clientesService: ClientesService,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { clienteId, ...reservaData } = createReservaDto;

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(clienteId);

    const reserva = this.reservasRepository.create({
      ...reservaData,
      cliente,
    });

    return await this.reservasRepository.save(reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const { clienteId, ...reservaData } = updateReservaDto;
    const reserva = await this.findOne(id);

    // Actualizar datos básicos
    Object.assign(reserva, reservaData);

    // Actualizar cliente si se proporciona
    if (clienteId) {
      const cliente = await this.clientesService.findOne(clienteId);
      reserva.cliente = cliente;
    }

    return await this.reservasRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservasRepository.remove(reserva);
  }

  async findByCliente(clienteId: number): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente'],
    });
  }

  async findByFecha(fecha: Date): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      where: { fecha },
      relations: ['cliente'],
    });
  }

  async findByHora(hora: string): Promise<Reserva[]> {
    return await this.reservasRepository.find({
      where: { hora },
      relations: ['cliente'],
    });
  }
} 