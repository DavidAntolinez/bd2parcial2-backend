import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseSqlModule } from './dataBaseSql/dataBaseSql.module';
import { DataBaseNoSqlModule } from './dataBaseNoSql/dataBaseNoSql.module';

@Module({
  imports: [DataBaseSqlModule, DataBaseNoSqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
