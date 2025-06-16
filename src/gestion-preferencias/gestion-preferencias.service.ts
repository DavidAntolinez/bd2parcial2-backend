import { Injectable } from '@nestjs/common';
import { CreatePreferenciasDto } from 'src/dataBaseNoSql/preferencias/dto/create-preferencias.dto';
import { PreferenciasService } from 'src/dataBaseNoSql/preferencias/preferencias.service';

@Injectable()
export class GestionPreferenciasService {
    constructor(private readonly preferenciasService: PreferenciasService) {}

    async crearPreferencia(createPreferenciasDto: CreatePreferenciasDto) {
        return this.preferenciasService.create(createPreferenciasDto);
    }

    async obtenerPreferencias(clienteId: number) {
        return this.preferenciasService.findByClienteId(clienteId);
    }


}
