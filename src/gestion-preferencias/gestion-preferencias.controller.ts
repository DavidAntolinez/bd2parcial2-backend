import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GestionPreferenciasService } from './gestion-preferencias.service';
import { CreatePreferenciasDto } from 'src/dataBaseNoSql/preferencias/dto/create-preferencias.dto';

@Controller('/api/gestion-preferencias')
export class GestionPreferenciasController {
  constructor(private readonly gestionPreferenciasService: GestionPreferenciasService) {}

  @Post()
  async crearPreferencia(@Body() createPreferenciasDto: CreatePreferenciasDto) {
    return this.gestionPreferenciasService.crearPreferencia(createPreferenciasDto);
  }

  @Get('/cliente/:clienteId') 
  async obtenerPreferencia(@Param('clienteId') clienteId: number) {
    return this.gestionPreferenciasService.obtenerPreferencias(clienteId);
  }
}
