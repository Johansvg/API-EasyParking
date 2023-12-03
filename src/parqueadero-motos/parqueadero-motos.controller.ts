import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParqueaderoMotosService } from './parqueadero-motos.service';
import { CreateParqueaderoMotoDto } from './dto/create-parqueadero-moto.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateInvitadoDto } from './dto/create-invitado-moto.dto';


@Controller('parqueadero-motos')
export class ParqueaderoMotosController {
  constructor(private readonly parqueaderoMotosService: ParqueaderoMotosService) {}

  @Post('ingreso')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  ingreso(@Body() createParqueaderoMotoDto: CreateParqueaderoMotoDto) {
    return this.parqueaderoMotosService.registrarIngreso(createParqueaderoMotoDto);
  }

  @Post('salida')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  salida(@Body() createParqueaderoMotoDto: CreateParqueaderoMotoDto) {
    return this.parqueaderoMotosService.registrarSalida(createParqueaderoMotoDto);
  }

  @Post('invitado')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  invitado(@Body() createInvitadoMoto: CreateInvitadoDto) {
    return this.parqueaderoMotosService.registrarInvitado(createInvitadoMoto);
  }
}
