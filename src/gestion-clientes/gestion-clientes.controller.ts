import { Controller, Get, Param } from '@nestjs/common';
import { GestionClientesService } from './gestion-clientes.service';

@Controller('/api/gestion-clientes')
export class GestionClientesController {
  constructor(private readonly gestionClientesService: GestionClientesService) {}

  @Get()
  async obtenerClientes() {
    return this.gestionClientesService.obtenerClientes();
  }

  @Get('/:id')
  async obtenerClientePorId(@Param('id') id: number) {
    return this.gestionClientesService.obtenerClientePorId(id);
  }

  @Get('/nombre/:nombre')
  async obtenerClientePorNombre(@Param('nombre') nombre: string) {
    return this.gestionClientesService.obtenerClientePorNombre(nombre);
  }

  @Get('/email/:email')
  async obtenerClientePorEmail(@Param('email') email: string) {
    return this.gestionClientesService.obtenerClientePorEmail(email);
  }
}
