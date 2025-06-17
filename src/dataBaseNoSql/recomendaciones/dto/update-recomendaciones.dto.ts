import { PartialType } from '@nestjs/mapped-types';
import { CreateRecomendacionesDto } from './create-recomendaciones.dto';

export class UpdateRecomendacionesDto extends PartialType(CreateRecomendacionesDto) {} 