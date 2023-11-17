import { Module } from '@nestjs/common';
import { ParqueaderoService } from './parqueadero.service';
import { ParqueaderoController } from './parqueadero.controller';
import { ParqueaderoCarrosModule } from 'src/parqueadero-carros/parqueadero-carros.module';
import { ParqueaderoMotosModule } from 'src/parqueadero-motos/parqueadero-motos.module';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ParqueaderoCarrosModule,
    ParqueaderoMotosModule,
    VehiculosModule,
    AuthModule
  ],
  controllers: [ParqueaderoController],
  providers: [ParqueaderoService],
})
export class ParqueaderoModule {}
