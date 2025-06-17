import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, ValidateNested } from 'class-validator';
import { PlatoDto } from 'src/dataBaseNoSql/reseña/dto/create-reseña.dto';

export class CreateRecomendacionesDto {

  @IsNumber()
  @IsInt()
  clienteId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatoDto)
  platosRecomendados: PlatoDto[];
} 