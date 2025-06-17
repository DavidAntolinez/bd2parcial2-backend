import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GestionReservasService } from './gestion-reservas.service';
import { CreateReservaDto } from 'src/dataBaseSql/reservas/dto/create-reserva.dto';

@Controller('/api/gestion-reservas')
export class GestionReservasController {
  constructor(private readonly gestionReservasService: GestionReservasService) {}

  @Get()
  async obtenerReservas() {
    return this.gestionReservasService.obtenerReservas();
  }

  @Post()
  async crearReserva(@Body() reserva: CreateReservaDto) {
    return this.gestionReservasService.crearReserva(reserva);
  }

  @Get("/buscar/cliente/:clienteId")
  async buscarReservasPorClienteId(@Param('clienteId') clienteId: number) {
    return this.gestionReservasService.buscarReservasPorClienteId(clienteId);
  }

  @Get("/buscar/fecha/:fecha")
  async buscarReservasPorFecha(@Param('fecha') fecha: Date) {
    return this.gestionReservasService.buscarReservasPorFecha(fecha);
  }
}
