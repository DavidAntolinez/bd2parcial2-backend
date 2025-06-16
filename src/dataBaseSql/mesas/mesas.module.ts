import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesasService } from './mesas.service';
import { Mesa } from './entities/mesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mesa])],
  providers: [MesasService],
  exports: [MesasService],
})
export class MesasModule {} 