import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GestionReseñasService } from './gestion-reseñas.service';
import { CreateReseñaDto } from 'src/dataBaseNoSql/reseña/dto/create-reseña.dto';

@Controller('/api/gestion-resenas')
export class GestionReseñasController {
  constructor(private readonly gestionReseñasService: GestionReseñasService) {}

  @Post()
  async crearReseña(@Body() reseña: CreateReseñaDto) {
    return this.gestionReseñasService.crearReseña(reseña);
  }

  @Get()
  async obtenerReseñas() {
    return this.gestionReseñasService.obtenerReseñas();
  }

  @Get('estrellas/:estrellas')
  async obtenerReseñasPorEstrellas(@Param('estrellas') estrellas: number) {
    return this.gestionReseñasService.obtenerReseñaPorEstrellas(estrellas);
  }

  @Get('tipo-visita/:tipoVisita')
  async obtenerReseñasPorTipoVisita(@Param('tipoVisita') tipoVisita: string) {
    return this.gestionReseñasService.obtenerReseñaPorTipoVisita(tipoVisita);
  }

  @Get('plato/:nombrePlato')
  async obtenerReseñasPorNombrePlato(@Param('nombrePlato') nombrePlato: string) {
    return this.gestionReseñasService.obtenerReseñaPorNombrePlato(nombrePlato);
  }
}
