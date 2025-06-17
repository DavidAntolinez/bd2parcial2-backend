import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { GestionHistorialPedidosService } from './gestion-historial-pedidos.service';
import { CreateHistorialPedidosDto } from 'src/dataBaseNoSql/historial-pedidos/dto/create-historial-pedidos.dto';

@Controller('/api/gestion-historial-pedidos')
export class GestionHistorialPedidosController {
  constructor(private readonly gestionHistorialPedidosService: GestionHistorialPedidosService) {}

  @Get()
  async obtenerHistorialPedidos() {
    return this.gestionHistorialPedidosService.obtenerHistorialPedidos();
  }

  @Post("/crear")
  async crearHistorialPedidos(@Body() createHistorialPedidosDto: CreateHistorialPedidosDto) {
    return this.gestionHistorialPedidosService.crearHistorialPedidos(createHistorialPedidosDto);
  }

  @Put("/actualizar/:id")
  async actualizarHistorialPedidos(@Param('id') _id:string,@Body() createHistorialPedidosDto: CreateHistorialPedidosDto) {
    return this.gestionHistorialPedidosService.actualizarHistorialPedidos(_id,createHistorialPedidosDto);
  }

  @Get("/cliente/:clienteId") 
  async buscarHistorialPedidosPorClienteId(@Param('clienteId') clienteId: number) {
    return this.gestionHistorialPedidosService.buscarHistorialPedidosPorClienteId(clienteId);
  }

  @Get("/fecha/:fecha")
  async buscarHistorialPedidosPorFecha(@Param('fecha') fecha: Date) {
    return this.gestionHistorialPedidosService.buscarHistorialPedidosPorFecha(fecha);
  }

  @Get("/plato/:platoId")
  async buscarHistorialPedidosPorPlatoId(@Param('platoId') platoId: number) {
    return this.gestionHistorialPedidosService.buscarHistorialPedidosPorPlatoId(platoId);
  }
}
