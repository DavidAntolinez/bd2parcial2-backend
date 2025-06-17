import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, ValidateNested, IsIn } from 'class-validator';
import { PlatoDto } from 'src/dataBaseNoSql/reseña/dto/create-reseña.dto';
import { INTOLERANCIAS_PERMITIDAS } from '../constants/intolerancias.constants';
import { PREFERENCIAS_PERMITIDAS } from '../constants/preferencias.constants';

export class CreatePreferenciasDto {

  @IsNumber()
  @IsInt()
  clienteId: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @IsIn(INTOLERANCIAS_PERMITIDAS, { 
    each: true, 
    message: `Cada intolerancia debe ser una de: ${INTOLERANCIAS_PERMITIDAS.join(', ')}` 
  })
  intolerancias: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @IsIn(PREFERENCIAS_PERMITIDAS, { 
    each: true, 
    message: `Cada preferencia debe ser una de: ${PREFERENCIAS_PERMITIDAS.join(', ')}` 
  })
  preferencias: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => PlatoDto)
  platosFavoritos: PlatoDto[];
} 