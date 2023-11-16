import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { request } from 'express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';



@Controller('vehiculos')
export class VehiculosController {
  constructor(
    private readonly vehiculosService: VehiculosService,
    
    ) {}

  // Registrar vehiculo
  @Post('register')
  @Roles(Role.User)
  @UseGuards(AuthGuard,RolesGuard)
  register(
      @Body() createVehiculoDto : CreateVehiculoDto,
      @Req() request : Request,
  ){
      const jwt = request.headers['authorization'];
      return this.vehiculosService.create(createVehiculoDto, jwt);
  }

  // Listar vehiculos de un usuario
  @Get('misVehiculos')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  misVehiculos(
    @Req() request : Request,
  ){
    const jwt = request.headers['authorization'];
    return this.vehiculosService.misVehiculos(jwt);
  }

  // Encontrar vehiculo por placas
  @Get(':placa')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  findOne(
    @Param('placa') placa: string,
    @Req() request : Request,
    ) {
      const jwt = request.headers['authorization'];
    return this.vehiculosService.vehiculoEspecifico(placa, jwt);
  }
  
  // Actualizar vehiculo
  @Patch(':placa')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  update(@Param('placa') placa: string, 
  @Body() updateVehiculoDto: UpdateVehiculoDto,
  @Req() request : Request,
  ) {
    const jwt = request.headers['authorization'];
    return this.vehiculosService.editarMiVehiculo(placa, jwt,  updateVehiculoDto);
  }

  // Eliminar vehiculo
  @Delete(':placa')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  remove(
    @Param('placa') placa: string,
    @Req() request : Request
    ) {
      const jwt = request.headers['authorization'];
    return this.vehiculosService.eliminarMiVehiculo(placa, jwt);
  }

  // findAll() {
  //   return this.vehiculosService.findAll();
  // }
}
