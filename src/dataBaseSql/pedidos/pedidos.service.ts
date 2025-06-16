import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepository: Repository<Pedido>,
    private clientesService: ClientesService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { clienteId, ...pedidoData } = createPedidoDto;

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(clienteId);

    const pedido = this.pedidosRepository.create({
      ...pedidoData,
      cliente,
    });

    return await this.pedidosRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidosRepository.find({
      relations: ['cliente'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const { clienteId, ...pedidoData } = updatePedidoDto;
    const pedido = await this.findOne(id);

    // Actualizar datos básicos
    Object.assign(pedido, pedidoData);

    // Actualizar cliente si se proporciona
    if (clienteId) {
      const cliente = await this.clientesService.findOne(clienteId);
      pedido.cliente = cliente;
    }

    return await this.pedidosRepository.save(pedido);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidosRepository.remove(pedido);
  }

  async findByCliente(clienteId: number): Promise<Pedido[]> {
    return await this.pedidosRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente'],
    });
  }

  async findByFecha(fecha: Date): Promise<Pedido[]> {
    return await this.pedidosRepository.find({
      where: { fecha },
      relations: ['cliente'],
    });
  }

  async findByTotal(total: number): Promise<Pedido[]> {
    return await this.pedidosRepository.find({
      where: { total },
      relations: ['cliente'],
    });
  }
} 