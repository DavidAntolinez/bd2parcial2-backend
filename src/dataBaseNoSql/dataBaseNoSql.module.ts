import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReseñaModule } from './reseña/reseña.module';
import { RecomendacionesModule } from './recomendaciones/recomendaciones.module';
import { PreferenciasModule } from './preferencias/preferencias.module';
import { HistorialPedidosModule } from './historial-pedidos/historial-pedidos.module';
import * as dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurante-parcial2',
      {
        // Configuraciones opcionales de conexión
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
    ),
    ReseñaModule,
    RecomendacionesModule,
    PreferenciasModule,
    HistorialPedidosModule,
  ],
})
export class DataBaseNoSqlModule {} 