import { Module } from '@nestjs/common';
import { ParqueaderoService } from './parqueadero.service';
import { ParqueaderoController } from './parqueadero.controller';
import { ParqueaderoCarrosModule } from 'src/parqueadero-carros/parqueadero-carros.module';
import { ParqueaderoMotosModule } from 'src/parqueadero-motos/parqueadero-motos.module';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';

@Module({
  imports: [
    ParqueaderoCarrosModule,
    ParqueaderoMotosModule,
    VehiculosModule,
  ],
  controllers: [ParqueaderoController],
  providers: [ParqueaderoService],
})
export class ParqueaderoModule {}
