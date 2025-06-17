import { Module } from '@nestjs/common';
import { GestionRecomendacionesService } from './gestion-recomendaciones.service';
import { GestionRecomendacionesController } from './gestion-recomendaciones.controller';
import { RecomendacionesModule } from 'src/dataBaseNoSql/recomendaciones/recomendaciones.module';
import { ClientesModule } from 'src/dataBaseSql/clientes/clientes.module';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';

@Module({
  imports: [RecomendacionesModule, ClientesModule, PlatosModule],
  controllers: [GestionRecomendacionesController],
  providers: [GestionRecomendacionesService],
})
export class GestionRecomendacionesModule {}
