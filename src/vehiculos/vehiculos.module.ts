import { Module } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo]),
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService]
})
export class VehiculosModule {}
