import { BadRequestException, ImATeapotException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReservasService } from 'src/dataBaseSql/reservas/reservas.service';
import { CreateReservaDto } from 'src/dataBaseSql/reservas/dto/create-reserva.dto';
import { Reserva } from 'src/dataBaseSql/reservas/entities/reserva.entity';
import { MesasService } from 'src/dataBaseSql/mesas/mesas.service';
import { Mesa } from 'src/dataBaseSql/mesas/entities/mesa.entity';

@Injectable()
export class GestionReservasService {
    constructor(
        private readonly reservasService: ReservasService,
        private readonly mesasService: MesasService
    ) { }

    async obtenerReservas() {
        return this.reservasService.findAll();
    }

    async crearReserva(reserva: CreateReservaDto) {
        console.log('Datos recibidos en crearReserva:', reserva);
        
        if (!reserva) {
            throw new BadRequestException('Los datos de la reserva son requeridos');
        }

        if (!reserva.clienteId || !reserva.mesaId || !reserva.fecha || !reserva.hora) {
            throw new BadRequestException('Todos los campos son requeridos: clienteId, mesaId, fecha, hora');
        }

        // // Verificar disponibilidad
        // const reservasConflicto = await this.verificarDisponibilidad(reserva);
        
        // if (reservasConflicto.length > 0) {
        //     throw new ImATeapotException(
        //         `No se puede crear la reserva. Ya existe una reserva para la mesa ${reserva.mesaId} el ${reserva.fecha} a las ${reserva.hora}`
        //     );
        // }
        

        return this.reservasService.create(reserva);
    }

    /**
     * Método que encuentra elementos que existen en los 3 arrays a la vez
     * @param array1 Primer array de reservas
     * @param array2 Segundo array de reservas  
     * @param array3 Tercer array de reservas
     * @returns Array con elementos que están en los 3 arrays
     */
    encontrarInterseccionTresArrays(array1: Reserva[], array2: Reserva[], array3: Reserva[]): Reserva[] {
        return array1.filter(reserva1 => 
            array2.some(reserva2 => reserva2.id === reserva1.id) &&
            array3.some(reserva3 => reserva3.id === reserva1.id)
        );
    }

    /**
     * Verifica si hay conflictos de disponibilidad para una nueva reserva
     * @param reserva Datos de la nueva reserva
     * @returns Array de reservas que tienen conflicto (misma fecha, mesa y hora)
     */
    async verificarDisponibilidad(fecha: Date, mesaId: number, hora: string): Promise<Reserva[]> {
        const reservasFecha = await this.reservasService.findByFecha(fecha);
        const reservasMesa = await this.reservasService.findByMesa(mesaId);
        const reservasHora = await this.reservasService.findByHora(hora);

        // Encontrar reservas que coincidan en los 3 criterios (fecha, mesa y hora)
        return this.encontrarInterseccionTresArrays(reservasFecha, reservasMesa, reservasHora);
    }

    async buscarReservasPorClienteId(clienteId: number) {
        return this.reservasService.findByCliente(clienteId);
    }

    async buscarReservasPorFecha(fecha: Date) {
        return this.reservasService.findByFecha(fecha);
    }

    async buscarMesasDisponibles(fecha: Date, hora: string, personas: number) {
        const mesas = await this.mesasService.findAll();
        
        let mesasDisponibles: Mesa[] = [];
        
        for (const mesa of mesas) {
            const reservasConflicto = await this.verificarDisponibilidad(fecha, mesa.id, hora);
            if (reservasConflicto.length === 0 && mesa.capacidad >= personas) {
                // console.log(mesa);
                mesasDisponibles.push(mesa);
            }
        }
        
        console.log('Mesas disponibles:', mesasDisponibles);
        return mesasDisponibles;
    }
    
}