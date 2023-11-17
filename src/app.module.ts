import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { ParqueaderoMotosModule } from './parqueadero-motos/parqueadero-motos.module';
import { ParqueaderoCarrosModule } from './parqueadero-carros/parqueadero-carros.module';
import { ParqueaderoModule } from './parqueadero/parqueadero.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl: 
          process.env.POSTGRES_SSL === 'true'
          ?{
            rejectUnauthorized: false,
          }
          : null,
      }
    }),
    UsersModule,
    AuthModule,
    VehiculosModule,
    ParqueaderoMotosModule,
    ParqueaderoCarrosModule,
    ParqueaderoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
