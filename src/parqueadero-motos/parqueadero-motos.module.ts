import { Module } from '@nestjs/common';
import { ParqueaderoMotosService } from './parqueadero-motos.service';
import { ParqueaderoMotosController } from './parqueadero-motos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParqueaderoMoto } from './entities/parqueadero-moto.entity';
import { HistorialMoto } from './entities/historial-motos.entity';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParqueaderoMoto]),
    TypeOrmModule.forFeature([HistorialMoto]),
    VehiculosModule,
    AuthModule
  ],
  
  controllers: [ParqueaderoMotosController],
  providers: [ParqueaderoMotosService],
  exports: [ParqueaderoMotosService],
})
export class ParqueaderoMotosModule {}
