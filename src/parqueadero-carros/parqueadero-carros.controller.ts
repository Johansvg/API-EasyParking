import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParqueaderoCarrosService } from './parqueadero-carros.service';
import { CreateParqueaderoCarroDto } from './dto/create-parqueadero-carro.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('parqueadero-carros')
export class ParqueaderoCarrosController {
  constructor(private readonly parqueaderoCarrosService: ParqueaderoCarrosService) {}

  @Post('ingreso')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  ingreso(
    @Body() createParqueaderoCarroDto: CreateParqueaderoCarroDto,
  ){
    return this.parqueaderoCarrosService.registrarIngreso(createParqueaderoCarroDto);
  }

  @Post('salida')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  salida(
    @Body() createParqueaderoCarroDto: CreateParqueaderoCarroDto,
    ){
      return this.parqueaderoCarrosService.registrarSalida(createParqueaderoCarroDto);
    }

    @Post('invitado')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    invitado(
      @Body() createParqueaderoCarroDto: CreateParqueaderoCarroDto,
      ){
        return this.parqueaderoCarrosService.registrarInvitado(createParqueaderoCarroDto);
      }
}
