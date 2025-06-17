import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialPedidosDto } from './create-historial-pedidos.dto';

export class UpdateHistorialPedidosDto extends PartialType(CreateHistorialPedidosDto) {} 