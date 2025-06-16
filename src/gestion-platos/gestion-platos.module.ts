import { Module } from '@nestjs/common';
import { GestionPlatosService } from './gestion-platos.service';
import { GestionPlatosController } from './gestion-platos.controller';
import { PlatosModule } from 'src/dataBaseSql/platos/platos.module';

@Module({
  imports: [PlatosModule],
  controllers: [GestionPlatosController],
  providers: [GestionPlatosService],
})
export class GestionPlatosModule {}
