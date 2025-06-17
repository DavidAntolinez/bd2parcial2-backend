import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preferencias, PreferenciasDocument } from './entities/preferencias.entity';
import { CreatePreferenciasDto } from './dto/create-preferencias.dto';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { PlatosService } from 'src/dataBaseSql/platos/platos.service';
import { ClientesService } from 'src/dataBaseSql/clientes/clientes.service';

@Injectable()
export class PreferenciasService {
  constructor(
    @InjectModel(Preferencias.name)
    private preferenciasModel: Model<PreferenciasDocument>,
    private readonly platosService: PlatosService,
    private readonly clientesService: ClientesService,
  ) {}

  async create(createPreferenciasDto: CreatePreferenciasDto): Promise<Preferencias> {

    const preferenciaExistente = await this.preferenciasModel.findOne({ clienteId: createPreferenciasDto.clienteId }).exec();
    if (preferenciaExistente) {
      throw new BadRequestException('Ya existe una preferencia para este cliente');
    }

    // Verificar que el cliente existe
    const cliente = await this.clientesService.findOne(createPreferenciasDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${createPreferenciasDto.clienteId} no encontrado`);
    }

    // Verificar que los platos existen y que los nombres coinciden
    if (createPreferenciasDto.platosFavoritos && createPreferenciasDto.platosFavoritos.length > 0) {
      for (const platoInfo of createPreferenciasDto.platosFavoritos) {
        const plato = await this.platosService.findOne(platoInfo.platoId);
        if (!plato ) {
          throw new NotFoundException(`Plato con ID ${platoInfo.platoId} no encontrado`);
        }else if (plato.nombre !== platoInfo.platoNombre) {
          throw new NotFoundException(`Los nombres de los platos no coinciden`);
        }
      }
    }


    const nuevaPreferencia = new this.preferenciasModel(createPreferenciasDto);
    return await nuevaPreferencia.save();
  }

  async findAll(): Promise<Preferencias[]> {
    return await this.preferenciasModel.find().exec();
  }

  async findById(_id: string): Promise<Preferencias> {
    const preferencia = await this.preferenciasModel.findOne({ _id }).exec();
    
    if (!preferencia) {
      throw new NotFoundException(`Preferencia con ID ${_id} no encontrada`);
    }
    
    return preferencia;
  }

  async update(_id: string, updatePreferenciasDto: UpdatePreferenciasDto): Promise<Preferencias> {
    const preferenciasActualizada = await this.preferenciasModel
      .findOneAndUpdate({ _id }, updatePreferenciasDto, { new: true })
      .exec();
    
    if (!preferenciasActualizada) {
      throw new NotFoundException(`Preferencia con ID ${_id} no encontrada`);
    }
    
    return preferenciasActualizada;
  }

  async remove(_id: string): Promise<void> {
    const resultado = await this.preferenciasModel.deleteOne({ _id }).exec();
    
    if (resultado.deletedCount === 0) {
      throw new NotFoundException(`Preferencia con ID ${_id} no encontrada`);
    }
  }

  async findByClienteId(clienteId: number): Promise<Preferencias> {

    // Validar que el clienteId sea válido
    if (!clienteId || clienteId <= 0 || !Number.isInteger(clienteId)) {
      throw new BadRequestException('El ID del cliente debe ser un número entero positivo válido');
    }

    const preferencia = await this.preferenciasModel.findOne({ clienteId }).exec();
    if (!preferencia) {
      throw new NotFoundException(`Preferencia con ID ${clienteId} no encontrada`);
    }
    return preferencia;
  }

} 