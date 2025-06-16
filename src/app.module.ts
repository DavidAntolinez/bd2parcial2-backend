import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseSqlModule } from './dataBaseSql/dataBaseSql.module';
import { DataBaseNoSqlModule } from './dataBaseNoSql/dataBaseNoSql.module';
import { GestionReservasModule } from './gestion-reservas/gestion-reservas.module';
import { GestionPlatosModule } from './gestion-platos/gestion-platos.module';
import { GestionPedidosModule } from './gestion-pedidos/gestion-pedidos.module';

@Module({
  imports: [DataBaseSqlModule, DataBaseNoSqlModule, GestionReservasModule, GestionPlatosModule, GestionPedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
