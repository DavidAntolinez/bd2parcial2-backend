import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePedidoPlatoDto {
  @IsNotEmpty()
  @IsNumber()
  platoId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cantidad: number;
} 