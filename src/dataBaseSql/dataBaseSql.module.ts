import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { MesasModule } from './mesas/mesas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PlatosModule } from './platos/platos.module';
import { ReservasModule } from './reservas/reservas.module';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // Usar connection pooler (puerto 6543) en lugar de conexión directa
      // url: `postgresql://postgres:${process.env.SUPABASE_PASSWORD}@db.mezzxooeleitftmbjltx.supabase.co:6543/postgres?pgbouncer=true`,
      host: process.env.MARIADB_HOST,
      port: parseInt(process.env.MARIADB_PORT || '3306'),
      username: process.env.MARIADB_USERNAME,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: process.env.NODE_ENV !== 'production',
      ssl: {
        rejectUnauthorized: false,
      },
      extra: {
        // Configuraciones de conexión optimizadas para pooler
        max: 10, // Máximo de conexiones
        connectionTimeoutMillis: 30000,
        idleTimeoutMillis: 10000,
      },
      // Debug adicional
      logging: false,
    }),
    ClientesModule,
    MesasModule,
    PedidosModule,
    PlatosModule,
    ReservasModule,
  ],
})
export class DataBaseSqlModule {} 