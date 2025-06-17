import { BadRequestException, Injectable } from '@nestjs/common';
import { PlatosService } from 'src/dataBaseSql/platos/platos.service';
import { CreatePlatoDto } from 'src/dataBaseSql/platos/dto/create-plato.dto';

@Injectable()
export class GestionPlatosService {
    constructor(private readonly platosService: PlatosService) {}

    async obtenerPlatos() {
        return this.platosService.findAll();
    }

    async crearPlato(plato: CreatePlatoDto) {

        const platoExistente = await this.platosService.findByNombre(plato.nombre);
        if(platoExistente.length > 0) {
            throw new BadRequestException('El plato ya existe');
        }

        return this.platosService.create(plato);
    }

    async actualizarPlato(id: number, plato: CreatePlatoDto) {

        const platoExistente = await this.platosService.findByNombre(plato.nombre);
        if(platoExistente[0].id !== id) {
            throw new BadRequestException('El nombre del plato ya existe');
        }

        return this.platosService.update(id, plato);
    }

    async buscarPlatoPorNombre(nombre: string) {
        return this.platosService.findByNombre(nombre);
    }

    async buscarPlatosPorCategoria(categoria: string) {
        return this.platosService.findByCategoria(categoria);
    }

    async buscarPlatosDisponibles() {
        return this.platosService.findDisponibles();
    }
    
}
