import { IsNotEmpty, IsString, IsNumber, IsDateString, Matches, Min } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
    message: 'La hora debe estar en formato HH:MM o HH:MM:SS (24 horas). Ejemplo: "14:30" o "14:30:00"'
  })
  hora: string;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsNumber()
  mesaId: number;

} 