import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsArray, ValidateNested, IsInt } from 'class-validator';

export class PlatoHistorialDto {
  @IsNumber()
  @IsInt()
  platoId: number;

  @IsString()
  platoNombre: string;

  @IsString()
  observacion: string;
}

export class CreateHistorialPedidosDto {

  @IsNumber()
  @IsInt()
  clienteId: number;

  @IsDateString()
  fecha: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatoHistorialDto)
  platos: PlatoHistorialDto[];
} 