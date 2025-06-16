import { IsNotEmpty, IsNumber, IsDateString, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePedidoPlatoDto } from './create-pedido-plato.dto';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoPlatoDto)
  platos: CreatePedidoPlatoDto[];
} 