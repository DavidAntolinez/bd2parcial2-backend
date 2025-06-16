import { IsString, IsNumber, IsDateString, IsArray, ValidateNested, Min, Max, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PlatoDto {
  @IsNumber()
  @IsInt()
  platoId: number;

  @IsString()
  platoNombre: string;
}

export class CreateReseñaDto {

  @IsNumber()
  @IsInt()
  @Min(1, { message: 'Las estrellas deben ser mínimo 1' })
  @Max(5, { message: 'Las estrellas deben ser máximo 5' })
  estrellas: number;

  @IsString()
  comentarioLibre: string;

  @IsString()
  tipoVisita: string;

  @IsDateString()
  fecha: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatoDto)
  platos: PlatoDto[];
} 