import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateMesaDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacidad: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  ubicacion: string;
} 