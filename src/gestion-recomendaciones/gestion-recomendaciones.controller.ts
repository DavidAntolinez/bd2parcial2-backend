import { Controller, Get, Param, Post } from '@nestjs/common';
import { GestionRecomendacionesService } from './gestion-recomendaciones.service';

@Controller('/api/gestion-recomendaciones')
export class GestionRecomendacionesController {
  constructor(private readonly gestionRecomendacionesService: GestionRecomendacionesService) {}

  @Post('/cliente/:clienteId')
  async crearRecomendaciones(@Param('clienteId') clienteId: number) {
    return this.gestionRecomendacionesService.crearRecomendaciones(clienteId);
  }

  @Get('/cliente/:clienteId')
  async obtenerRecomendaciones(@Param('clienteId') clienteId: number) {
    return this.gestionRecomendacionesService.obtenerRecomendaciones(clienteId);
  }
}
