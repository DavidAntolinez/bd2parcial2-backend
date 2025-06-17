import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { GestionPlatosService } from './gestion-platos.service';
import { CreatePlatoDto } from 'src/dataBaseSql/platos/dto/create-plato.dto';

@Controller('/api/gestion-platos')
export class GestionPlatosController {
  constructor(private readonly gestionPlatosService: GestionPlatosService) {}


  @Get()
  async obtenerPlatos() {
    return this.gestionPlatosService.obtenerPlatos();
  }

  @Post()
  async crearPlato(@Body() plato: CreatePlatoDto) {
    return this.gestionPlatosService.crearPlato(plato);
  }

  @Put(':id')
  async actualizarPlato(@Param('id') id: number, @Body() plato: CreatePlatoDto) {
    return this.gestionPlatosService.actualizarPlato(id, plato);
  }

  @Get('/nombre/:nombre')
  async buscarPlatoPorNombre(@Param('nombre') nombre: string) {
    return this.gestionPlatosService.buscarPlatoPorNombre(nombre);
  }

  @Get('/categoria/:categoria')
  async buscarPlatosPorCategoria(@Param('categoria') categoria: string) {
    return this.gestionPlatosService.buscarPlatosPorCategoria(categoria);
  }

  @Get('/disponibles')
  async buscarPlatosDisponibles() {
    return this.gestionPlatosService.buscarPlatosDisponibles();
  }
}