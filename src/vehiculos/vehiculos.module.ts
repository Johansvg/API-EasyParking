import { Module, forwardRef } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo]),
    AuthModule
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService]
})
export class VehiculosModule {}
