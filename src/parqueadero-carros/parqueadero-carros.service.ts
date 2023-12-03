import { BadRequestException, Injectable, CanActivate } from '@nestjs/common';
import { CreateParqueaderoCarroDto } from './dto/create-parqueadero-carro.dto';
import { UpdateParqueaderoCarroDto } from './dto/update-parqueadero-carro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParqueaderoCarro } from './entities/parqueadero-carro.entity';
import { HistorialCarro } from './entities/historial-carro.entity';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';
import { Repository } from 'typeorm';

@Injectable()
export class ParqueaderoCarrosService {

  constructor(
    @InjectRepository(ParqueaderoCarro)
    private parqueaderoCarroRepository: Repository<ParqueaderoCarro>,
    @InjectRepository(HistorialCarro)
    private historialCarroRepository: Repository<HistorialCarro>,
    private readonly vehiculosService: VehiculosService,
  ) {}

    async registrarIngreso(createParqueaderoCarroDto: CreateParqueaderoCarroDto) {
        
        // Mejorar esto despues-------------------------------->

        // Quitar espacio espacios en la placa
        createParqueaderoCarroDto.placaVehiculoReg = createParqueaderoCarroDto.placaVehiculoReg.replace(/\s+/g, '');
  
        // Definir capacidad del parqueadero
        // const capacidadParqueadero = 20;
        
        // Obtener vehiculo de la base de datos
        const vehiculo = await this.vehiculosService.findByPlaca(createParqueaderoCarroDto.placaVehiculoReg);
  
        // Validar capacidad del parqueadero
        let cantidadVehiculos = await this.parqueaderoCarroRepository.count();
        if (cantidadVehiculos >= 30) {
          throw new BadRequestException('El parqueadero de carros se encuentra lleno');
        }
        else{
          cantidadVehiculos = cantidadVehiculos + 1;
        }
  
        // Llenar Dto con datos del vehiculo
        createParqueaderoCarroDto.horaIngreso = new Date();
        createParqueaderoCarroDto.tipoVehiculoReg = vehiculo.tipoVehiculo;
        
        // Registrar ingreso 
        await this.parqueaderoCarroRepository.save(createParqueaderoCarroDto);

        return {
          mensaje: 'Ingreso exitoso',
          cantidadVehiculos
        }
    }

    async registrarSalida(createParqueaderoCarroDto: CreateParqueaderoCarroDto) {

      // Validar que el vehículo se encuentre en el parqueadero
      const vehiculo = await this.findByPlaca(createParqueaderoCarroDto.placaVehiculoReg);
      if (!vehiculo) {
        throw new BadRequestException('El vehículo no se encuentra en el parqueadero');
      }

      // Ingresar registro a la tabla historial
      const registroHistorial = new HistorialCarro();
      const registroActual = await this.encontrarRegistro(createParqueaderoCarroDto.placaVehiculoReg);
      registroHistorial.placaVehiculoReg = registroActual.placaVehiculoReg;
      registroHistorial.tipoVehiculoReg = registroActual.tipoVehiculoReg;
      registroHistorial.horaIngreso = registroActual.horaIngreso;
      registroHistorial.horaSalida = new Date();
      await this.historialCarroRepository.save(registroHistorial);

      // Eliminar registro de la tabla parqueadero-carros
      await this.deleteByPlaca(registroActual.placaVehiculoReg);

      const cantidadVehiculos = await this.parqueaderoCarroRepository.count();

      return {
        mensaje: 'Salida exitosa',
        cantidadVehiculos
      }

    }

    async registrarInvitado(createParqueaderoCarroDto: CreateParqueaderoCarroDto) {
      // Validar que el carro no se encuentre en el parqueadero
      const vehiculo = await this.findByPlaca(createParqueaderoCarroDto.placaVehiculoReg);
      if (vehiculo) {
        throw new BadRequestException('El vehiculo ya se encuentra en el parqueadero');
      }
      
      let cantidadVehiculos = await this.parqueaderoCarroRepository.count();
      if (cantidadVehiculos >= 30) {
        throw new BadRequestException('El parqueadero de carros se encuentra lleno');
      }
      else{
        cantidadVehiculos = cantidadVehiculos + 1;
      }

      // Llenar Dto con datos del vehiculo
      createParqueaderoCarroDto.horaIngreso = new Date();

      // Registrar ingreso
      await this.parqueaderoCarroRepository.save(createParqueaderoCarroDto);

      return {
        mensaje: 'Ingreso exitoso',
        cantidadVehiculos
      }

    }

    async findByPlaca(placaVehiculoReg: string) {
      return await this.parqueaderoCarroRepository.findOneBy({ placaVehiculoReg });
    }

    async ocupacionParqueadero() {
      return await this.parqueaderoCarroRepository.count();
    }

    async encontrarRegistro(placaVehiculoReg: string) {
      return await this.parqueaderoCarroRepository.findOneBy({placaVehiculoReg});
    }

    async deleteByPlaca(placaVehiculoReg: string) {
      return await this.parqueaderoCarroRepository.delete({placaVehiculoReg});
    }
}
