import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParqueaderoMotoDto } from './dto/create-parqueadero-moto.dto';
import { UpdateParqueaderoMotoDto } from './dto/update-parqueadero-moto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ParqueaderoMoto } from './entities/parqueadero-moto.entity';
import { HistorialMoto } from './entities/historial-motos.entity';
import { Repository } from 'typeorm';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';
import { CreateInvitadoDto } from 'src/parqueadero-motos/dto/create-invitado-moto.dto';

@Injectable()
export class ParqueaderoMotosService {

  constructor(
    @InjectRepository(ParqueaderoMoto)
    private parqueaderoMotoRepository: Repository<ParqueaderoMoto>,
    @InjectRepository(HistorialMoto)
    private historialMotoRepository: Repository<HistorialMoto>,
    private readonly vehiculosService: VehiculosService,
  ) {}

    async registrarIngreso(createParqueaderoMotoDto: CreateParqueaderoMotoDto) {

      // Mejorar esto despues-------------------------------->

      // Definir capacidad del parqueadero
      // const capacidadParqueadero = 100;
      
      // Obtener vehiculo de la base de datos
      const vehiculo = await this.vehiculosService.findByPlaca(createParqueaderoMotoDto.placaVehiculoReg);

      // Validar capacidad del parqueadero
      let cantidadVehiculos = await this.parqueaderoMotoRepository.count();
      if (cantidadVehiculos >= 100) {
        throw new BadRequestException('El parqueadero de motos se encuentra lleno');
      }
      else{
        cantidadVehiculos = cantidadVehiculos + 1;
      }

      // Llenar Dto con datos del vehiculo
      createParqueaderoMotoDto.horaIngreso = new Date();
      createParqueaderoMotoDto.tipoVehiculoReg = vehiculo.tipoVehiculo;

      // Registrar ingreso 
      await this.parqueaderoMotoRepository.save(createParqueaderoMotoDto);

      // Retornar mensaje y cantidad de vehiculos en el parqueadero
      return {
          mensaje: 'Ingreso exitoso',
         cantidadVehiculos
        };
    }

    async registrarSalida(createParqueaderoMotoDto: CreateParqueaderoMotoDto) {

      // Validar que el vehículo se encuentre en el parqueadero
      const vehiculo = await this.findByPlaca(createParqueaderoMotoDto.placaVehiculoReg);
      if (!vehiculo) {
        throw new BadRequestException('El vehículo no se encuentra en el parqueadero');
      }

      // Ingresar registro a la tabla historial
      const registroHistorial = new HistorialMoto();
      const registroActual = await this.encontrarRegistro(createParqueaderoMotoDto.placaVehiculoReg);
      registroHistorial.placaVehiculoReg = registroActual.placaVehiculoReg;
      registroHistorial.tipoVehiculoReg = registroActual.tipoVehiculoReg;
      registroHistorial.horaIngreso = registroActual.horaIngreso;
      registroHistorial.horaSalida = new Date();
      await this.historialMotoRepository.save(registroHistorial);

      // // Eliminar registro de la tabla parqueadero-motos
      await this.deleteByPlaca(registroActual.placaVehiculoReg);

      // Calcular cuantos vehiculos hay en el parqueadero
      let cantidadVehiculos = await this.parqueaderoMotoRepository.count();
      
      return {
        mensaje: 'Salida exitosa',
        cantidadVehiculos
      };
    }

    async registrarInvitado(createInvitadoMoto : CreateInvitadoDto) {
      // Validar que el vehículo no se encuentre en el parqueadero
      const vehiculo = await this.findByPlaca(createInvitadoMoto.placaVehiculoReg);
      if (vehiculo) {
        throw new BadRequestException('El vehículo ya se encuentra en el parqueadero');
      }

      let cantidadVehiculos = await this.parqueaderoMotoRepository.count();
      if (cantidadVehiculos >= 100) {
        throw new BadRequestException('El parqueadero de motos se encuentra lleno');
      }
      else{
        cantidadVehiculos = cantidadVehiculos + 1;
      }

      // Llenar Dto con datos del vehiculo
      let invitadoMoto = new CreateInvitadoDto();
      invitadoMoto.horaIngreso = new Date();
      invitadoMoto.placaVehiculoReg = createInvitadoMoto.placaVehiculoReg;
      invitadoMoto.tipoVehiculoReg = createInvitadoMoto.tipoVehiculoReg;

      // Registrar ingreso
      await this.parqueaderoMotoRepository.save(invitadoMoto);

      return {
          mensaje: 'Ingreso exitoso',
         cantidadVehiculos
        };
    }

    // REVISAR 
    async findByPlaca(placaVehiculoReg: string) {
      return await this.parqueaderoMotoRepository.findOneBy({ placaVehiculoReg });
    }

    async ocupacionParqueadero() {
      return await this.parqueaderoMotoRepository.count();
    }

    async encontrarRegistro(placaVehiculoReg: string) {
      return await this.parqueaderoMotoRepository.findOneBy({ placaVehiculoReg });
    }

    async deleteByPlaca(placaVehiculoReg: string) {
      return await this.parqueaderoMotoRepository.delete({ placaVehiculoReg });
    }
}
