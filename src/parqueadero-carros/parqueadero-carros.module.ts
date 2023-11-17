import { Module } from '@nestjs/common';
import { ParqueaderoCarrosService } from './parqueadero-carros.service';
import { ParqueaderoCarrosController } from './parqueadero-carros.controller';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParqueaderoCarro } from './entities/parqueadero-carro.entity'; 
import { HistorialCarro } from './entities/historial-carro.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParqueaderoCarro]),
    TypeOrmModule.forFeature([HistorialCarro]),
    VehiculosModule,
    AuthModule
  ],
  controllers: [ParqueaderoCarrosController],
  providers: [ParqueaderoCarrosService],
  exports: [ParqueaderoCarrosService],
})
export class ParqueaderoCarrosModule {}
