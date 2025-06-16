import { IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';

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
} 