import { Module } from '@nestjs/common';
import { GestionReseñasService } from './gestion-reseñas.service';
import { GestionReseñasController } from './gestion-reseñas.controller';
import { ReseñaModule } from 'src/dataBaseNoSql/reseña/reseña.module';

@Module({
  imports: [ReseñaModule],
  controllers: [GestionReseñasController],
  providers: [GestionReseñasService],
})
export class GestionReseñasModule {}
