import { Injectable } from '@nestjs/common';
import { ClientesService } from 'src/dataBaseSql/clientes/clientes.service';

@Injectable()
export class GestionClientesService {
  constructor(private readonly clientesService: ClientesService) {}

  async obtenerClientes() {
    return this.clientesService.findAll();
  }

  async obtenerClientePorId(id: number) {
    return this.clientesService.findOne(id);
  }

  async obtenerClientePorEmail(email: string) {
    return this.clientesService.findByEmail(email);
  }

  async obtenerClientePorNombre(nombre: string) {
    return this.clientesService.findByNombre(nombre);
  }
}
