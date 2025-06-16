import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from 'src/dataBaseSql/pedidos/dto/create-pedido.dto';
import { PedidosService } from 'src/dataBaseSql/pedidos/pedidos.service';

@Injectable()
export class GestionPedidosService {
    constructor(private readonly pedidosService: PedidosService) {}

    async crearPedido(pedido: CreatePedidoDto) {
        return this.pedidosService.create(pedido);
    }

    async obtenerPedidosPorCliente(clienteId: number) {
        return this.pedidosService.findByCliente(clienteId);
    }

    async obtenerPedidosPorFecha(fecha: string) {
        return this.pedidosService.findByFecha(fecha);
    }
    
}
