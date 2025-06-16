import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosService } from './platos.service';
import { Plato } from './entities/plato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  providers: [PlatosService],
  exports: [PlatosService],
})
export class PlatosModule {} 