import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {} 