import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  hora: string;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;
} 