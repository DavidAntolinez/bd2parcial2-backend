import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseSqlModule } from './dataBaseSql/dataBaseSql.module';

@Module({
  imports: [DataBaseSqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
