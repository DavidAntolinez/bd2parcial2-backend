import { Injectable } from '@nestjs/common';
import { CreateHistorialPedidosDto } from 'src/dataBaseNoSql/historial-pedidos/dto/create-historial-pedidos.dto';
import { HistorialPedidosService } from 'src/dataBaseNoSql/historial-pedidos/historial-pedidos.service';

@Injectable()
export class GestionHistorialPedidosService {
    constructor(
        private readonly historialPedidosService: HistorialPedidosService,
    ) {}

    async crearHistorialPedidos(createHistorialPedidosDto: CreateHistorialPedidosDto) {
        return this.historialPedidosService.create(createHistorialPedidosDto);
    }

    async actualizarHistorialPedidos(_id:string,createHistorialPedidosDto: CreateHistorialPedidosDto) {
        return this.historialPedidosService.update(_id,createHistorialPedidosDto);
    }

    async buscarHistorialPedidosPorClienteId(clienteId: number) {
        return this.historialPedidosService.findByClienteId(clienteId);
    }

    async buscarHistorialPedidosPorFecha(fecha: Date) {
        return this.historialPedidosService.findByFecha(fecha);
    }

    async buscarHistorialPedidosPorPlatoId(platoId: number) {
        return this.historialPedidosService.findByPlatoId(platoId);
    }
}
