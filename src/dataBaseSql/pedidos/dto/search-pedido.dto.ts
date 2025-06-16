import { IsOptional, IsDateString, IsNumber, Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchPedidoByFechaDto {
  @IsDateString({}, { message: 'La fecha debe estar en formato válido (YYYY-MM-DD)' })
  fecha: string;
}

export class SearchPedidoByClienteDto {
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  @IsInt({ message: 'El ID del cliente debe ser un entero' })
  @Min(1, { message: 'El ID del cliente debe ser mayor a 0' })
  @Transform(({ value }) => parseInt(value))
  clienteId: number;
}

export class SearchPedidoByTotalDto {
  @IsNumber({}, { message: 'El total debe ser un número' })
  @IsInt({ message: 'El total debe ser un entero' })
  @Min(0, { message: 'El total debe ser mayor o igual a 0' })
  @Transform(({ value }) => parseInt(value))
  total: number;
} 