import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PlatoDto } from 'src/dataBaseNoSql/reseña/dto/create-reseña.dto';

export class CreatePreferenciasDto {

  @IsNumber()
  @IsInt()
  clienteId: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  intolerancias: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferencias: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => PlatoDto)
  platosFavoritos: PlatoDto[];
} 