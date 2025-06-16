import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoPlato } from './entities/pedido-plato.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ClientesService } from '../clientes/clientes.service';
import { PlatosService } from '../platos/platos.service';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepository: Repository<Pedido>,
    @InjectRepository(PedidoPlato)
    private pedidoPlatosRepository: Repository<PedidoPlato>,
    private clientesService: ClientesService,
    private platosService: PlatosService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const { clienteId, platos, ...pedidoData } = createPedidoDto;

    // Validar la fecha
    if (pedidoData.fecha) {
      const fecha = new Date(pedidoData.fecha);
      if (isNaN(fecha.getTime())) {
        throw new BadRequestException('Formato de fecha inválido');
      }
    }

    // Validar que hay platos en el pedido
    if (!platos || platos.length === 0) {
      throw new BadRequestException('El pedido debe contener al menos un plato');
    }

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(clienteId);

    // Verificar que los platos existen
    for (const platoInfo of platos) {
      const plato = await this.platosService.findOne(platoInfo.platoId);
      
      if (!plato) {
        throw new NotFoundException(`Plato con ID ${platoInfo.platoId} no encontrado`);
      }
    }

    // Crear el pedido
    const pedido = this.pedidosRepository.create({
      ...pedidoData,
      cliente,
    });

    const savedPedido = await this.pedidosRepository.save(pedido);

    // Crear las relaciones pedido-plato con cantidades
    for (const platoInfo of platos) {
      const plato = await this.platosService.findOne(platoInfo.platoId);
      
      const pedidoPlato = this.pedidoPlatosRepository.create({
        pedido: savedPedido,
        plato: plato,
        cantidad: platoInfo.cantidad,
      });

      await this.pedidoPlatosRepository.save(pedidoPlato);
    }

    return this.findOne(savedPedido.id);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.pedidosRepository.find({
      relations: ['cliente', 'pedidoPlatos', 'pedidoPlatos.plato'],
    });
  }

  async findOne(id: number): Promise<Pedido> {
    // Validar que el ID sea válido
    if (!id || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestException('El ID del pedido debe ser un número entero positivo válido');
    }

    const pedido = await this.pedidosRepository.findOne({
      where: { id },
      relations: ['cliente', 'pedidoPlatos', 'pedidoPlatos.plato'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    // Validar que el ID sea válido
    if (!id || id <= 0 || !Number.isInteger(id)) {
      throw new BadRequestException('El ID del pedido debe ser un número entero positivo válido');
    }

    const { clienteId, ...pedidoData } = updatePedidoDto;
    const pedido = await this.findOne(id);

    // Validar fecha si se proporciona
    if (pedidoData.fecha) {
      const fecha = new Date(pedidoData.fecha);
      if (isNaN(fecha.getTime())) {
        throw new BadRequestException('Formato de fecha inválido');
      }
    }

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
    // Validar que el clienteId sea válido
    if (!clienteId || clienteId <= 0 || !Number.isInteger(clienteId)) {
      throw new BadRequestException('El ID del cliente debe ser un número entero positivo válido');
    }

    // Verificar que el cliente existe
    await this.clientesService.findOne(clienteId);

    return await this.pedidosRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente', 'pedidoPlatos', 'pedidoPlatos.plato'],
    });
  }

  async findByFecha(fecha: string): Promise<Pedido[]> {
    // Validar que la fecha no esté vacía o sea inválida
    if (!fecha || fecha.trim() === '' || fecha === '0') {
      throw new BadRequestException('La fecha es requerida y debe ser válida');
    }

    // Validar formato de fecha usando regex para YYYY-MM-DD
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha)) {
      throw new BadRequestException('Formato de fecha inválido. Use YYYY-MM-DD');
    }

    // Convertir string a Date y validar
    const fechaValida = new Date(fecha + 'T00:00:00.000Z');
    if (isNaN(fechaValida.getTime())) {
      throw new BadRequestException('Fecha inválida. Verifique que sea una fecha real');
    }

    // Usar la fecha directamente en formato YYYY-MM-DD
    return await this.pedidosRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.pedidoPlatos', 'pedidoPlatos')
      .leftJoinAndSelect('pedidoPlatos.plato', 'plato')
      .where('DATE(pedido.fecha) = :fecha', { fecha })
      .getMany();
  }

  async findByTotal(total: number): Promise<Pedido[]> {
    // Validar que el total sea válido
    if (total === null || total === undefined || total < 0 || !Number.isInteger(total)) {
      throw new BadRequestException('El total debe ser un número entero positivo o cero');
    }

    return await this.pedidosRepository.find({
      where: { total },
      relations: ['cliente', 'pedidoPlatos', 'pedidoPlatos.plato'],
    });
  }
} 