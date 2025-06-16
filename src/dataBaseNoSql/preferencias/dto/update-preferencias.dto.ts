import { PartialType } from '@nestjs/mapped-types';
import { CreatePreferenciasDto } from './create-preferencias.dto';

export class UpdatePreferenciasDto extends PartialType(CreatePreferenciasDto) {} 