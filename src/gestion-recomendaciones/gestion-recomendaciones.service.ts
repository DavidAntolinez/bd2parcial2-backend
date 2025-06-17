import { Injectable } from '@nestjs/common';
import { RecomendacionesService } from 'src/dataBaseNoSql/recomendaciones/recomendaciones.service';

@Injectable()
export class GestionRecomendacionesService {
    constructor(private readonly recomendacionesService: RecomendacionesService) {}

    async crearRecomendaciones(clienteId: number) {
        return this.recomendacionesService.create(clienteId);
    }

    async obtenerRecomendaciones(clienteId: number) {
        return this.recomendacionesService.findByClienteId(clienteId);
    }
}
