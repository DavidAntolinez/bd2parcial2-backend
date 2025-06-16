import { Module } from '@nestjs/common';
import { GestionPreferenciasService } from './gestion-preferencias.service';
import { GestionPreferenciasController } from './gestion-preferencias.controller';
import { PreferenciasModule } from 'src/dataBaseNoSql/preferencias/preferencias.module';

@Module({
  imports: [PreferenciasModule],
  controllers: [GestionPreferenciasController],
  providers: [GestionPreferenciasService],
})
export class GestionPreferenciasModule {}
