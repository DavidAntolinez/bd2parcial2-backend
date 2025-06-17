import { Module } from '@nestjs/common';
import { GestionClientesService } from './gestion-clientes.service';
import { GestionClientesController } from './gestion-clientes.controller';
import { ClientesModule } from 'src/dataBaseSql/clientes/clientes.module';

@Module({
  imports: [ClientesModule],
  controllers: [GestionClientesController],
  providers: [GestionClientesService],
})
export class GestionClientesModule {}
