import { IsNotEmpty, IsString, IsNumber, IsBoolean, Length, Min } from 'class-validator';

export class CreatePlatoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  categoria: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precio: number;

  @IsBoolean()
  disponible: boolean;
} 