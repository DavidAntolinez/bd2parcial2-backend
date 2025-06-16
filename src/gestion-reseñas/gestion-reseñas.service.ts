import { Injectable } from '@nestjs/common';
import { CreateReseñaDto } from 'src/dataBaseNoSql/reseña/dto/create-reseña.dto';
import { ReseñaService } from 'src/dataBaseNoSql/reseña/reseña.service';

@Injectable()
export class GestionReseñasService {
    constructor(private readonly reseñasService: ReseñaService) {}

    async crearReseña(reseña: CreateReseñaDto) {
        return this.reseñasService.create(reseña);
    }

    async obtenerReseñas() {
        return this.reseñasService.findAll();
    }

    async obtenerReseñaPorEstrellas(estrellas: number) {
        return this.reseñasService.findByEstrellas(estrellas);
    }

    async obtenerReseñaPorTipoVisita(tipoVisita: string) {
        return this.reseñasService.findByTipoVisita(tipoVisita);
    }

    async obtenerReseñaPorNombrePlato(nombrePlato: string) {
        return this.reseñasService.findByPlato(nombrePlato);
    }
    
}
