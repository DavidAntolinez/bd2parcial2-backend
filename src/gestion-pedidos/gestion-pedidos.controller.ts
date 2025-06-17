import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GestionPedidosService } from './gestion-pedidos.service';
import { CreatePedidoDto } from 'src/dataBaseSql/pedidos/dto/create-pedido.dto';

@Controller('/api/gestion-pedidos')
export class GestionPedidosController {
  constructor(private readonly gestionPedidosService: GestionPedidosService) {}


  @Get()
  async obtenerPedidos() {
    return this.gestionPedidosService.obtenerPedidos();
  }

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

  @Get('/platos/:pedidoId')
  async obtenerPedidoPlatos(@Param('pedidoId') pedidoId: number) {
    return this.gestionPedidosService.obtenerPedidoPlatos(pedidoId);
  }


}
