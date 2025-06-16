import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GestionPedidosService } from './gestion-pedidos.service';
import { CreatePedidoDto } from 'src/dataBaseSql/pedidos/dto/create-pedido.dto';

@Controller('/api/gestion-pedidos')
export class GestionPedidosController {
  constructor(private readonly gestionPedidosService: GestionPedidosService) {}

  @Post()
  async crearPedido(@Body() pedido: CreatePedidoDto) {
    return this.gestionPedidosService.crearPedido(pedido);
  }

  @Get('/cliente/:clienteId')
  async obtenerPedidosPorCliente(@Param('clienteId') clienteId: number) {
    return this.gestionPedidosService.obtenerPedidosPorCliente(clienteId);
  }

  @Get('/fecha/:fecha')
  async obtenerPedidosPorFecha(@Param('fecha') fecha: string) {
    return this.gestionPedidosService.obtenerPedidosPorFecha(fecha);
  }
}
