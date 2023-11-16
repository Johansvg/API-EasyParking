import { VehiculosService } from './../vehiculos/vehiculos.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParqueaderoDto } from './dto/create-parqueadero.dto';
import { UpdateParqueaderoDto } from './dto/update-parqueadero.dto';
import { ParqueaderoCarrosService } from 'src/parqueadero-carros/parqueadero-carros.service';
import { ParqueaderoMotosService } from 'src/parqueadero-motos/parqueadero-motos.service';

@Injectable()
export class ParqueaderoService {

  constructor(
    private readonly parqueaderoCarrosService: ParqueaderoCarrosService,
    private readonly parqueaderoMotoService: ParqueaderoMotosService,
    private readonly vehiculosService: VehiculosService,
  ) {}

  create(createParqueaderoDto: CreateParqueaderoDto) {
    return 'This action adds a new parqueadero';
  }

  async ingreso(createParqueaderoDto: CreateParqueaderoDto) {

    // Capacidad de los parqueaderos
    const capacidadParqueaderoCarros = 20;
    const capacidadParqueaderoMotos = 50;

    // Validar que el vehiculo exista en la base de datos
    const vehiculo = await this.vehiculosService.findByPlaca(createParqueaderoDto.placaVehiculoReg);
    if (!vehiculo) {
      throw new BadRequestException('El vehiculo no existe en la base de datos');
    }

    // Determinar el tipo de vehiculo
    const tipo = vehiculo.tipoVehiculo.toLowerCase();

    // Validar que el vehiculo no se encuentre en el parqueadero
    if (tipo == 'carro') {
      const parqueaderoCarro = await this.estaEnParqueaderoCarros(createParqueaderoDto.placaVehiculoReg);
      if (parqueaderoCarro) {
        throw new BadRequestException('El vehiculo ya se encuentra en el parqueadero');
      }
    }
    else{
      const parqueaderoMoto = await this.estaEnParqueaderoMotos(createParqueaderoDto.placaVehiculoReg);
      if (parqueaderoMoto) {
        throw new BadRequestException('El vehiculo ya se encuentra en el parqueadero');
      }
    }

    // Validar que el parqueadero no este lleno
    if (tipo == 'carro') {
      const cantidadVehiculos = await this.parqueaderoCarrosService.ocupacionParqueadero();
      if (cantidadVehiculos >= capacidadParqueaderoCarros) {
        throw new BadRequestException('El parqueadero de carros se encuentra lleno');
      }
    }
    else{
      const cantidadVehiculos = await this.parqueaderoMotoService.ocupacionParqueadero();
      if (cantidadVehiculos >= capacidadParqueaderoMotos) {
        throw new BadRequestException('El parqueadero de motos se encuentra lleno');
      }
    }

    // Registrar ingreso
    if (tipo == 'carro') {
      return await this.parqueaderoCarrosService.registrarIngreso(createParqueaderoDto);
    }
    else{
      return await this.parqueaderoMotoService.registrarIngreso(createParqueaderoDto);
    }
  }

  async salida(createParqueaderoDto: CreateParqueaderoDto) {
    // Validar que el vehiculo exista en la base de datos
    const vehiculo = await this.vehiculosService.findByPlaca(createParqueaderoDto.placaVehiculoReg);
    if (!vehiculo) {
      throw new BadRequestException('El vehiculo no existe en la base de datos');
    }

    // Determinar el tipo de vehiculo
    const tipo = vehiculo.tipoVehiculo.toLowerCase();

    // Validar que el vehiculo se encuentre en el parqueadero
    if (tipo == 'carro') {
      const parqueaderoCarro = await this.estaEnParqueaderoCarros(createParqueaderoDto.placaVehiculoReg);
      if (!parqueaderoCarro) {
        throw new BadRequestException('El vehiculo no se encuentra en el parqueadero');
      }
    }
    else{
      const parqueaderoMoto = await this.estaEnParqueaderoMotos(createParqueaderoDto.placaVehiculoReg);
      if (!parqueaderoMoto) {
        throw new BadRequestException('El vehiculo no se encuentra en el parqueadero');
      }
    }

    // Registrar salida
    if (tipo == 'carro') {
      return await this.parqueaderoCarrosService.registrarSalida(createParqueaderoDto);
    }
    else{
      return await this.parqueaderoMotoService.registrarSalida(createParqueaderoDto);
    }
  }

  async estaEnParqueaderoMotos(placaVehiculoReg: string) {
    return await this.parqueaderoMotoService.findByPlaca(placaVehiculoReg);
  }

  async estaEnParqueaderoCarros(placaVehiculoReg: string) {
    return await this.parqueaderoCarrosService.findByPlaca(placaVehiculoReg);
  }
}
