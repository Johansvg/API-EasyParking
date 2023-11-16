import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParqueaderoService } from './parqueadero.service';
import { CreateParqueaderoDto } from './dto/create-parqueadero.dto';
import { UpdateParqueaderoDto } from './dto/update-parqueadero.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('parqueadero')
export class ParqueaderoController {
  constructor(private readonly parqueaderoService: ParqueaderoService) {}

  @Post('ingreso')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  ingreso(@Body() createParqueaderoDto: CreateParqueaderoDto) {
    return this.parqueaderoService.ingreso(createParqueaderoDto);
  }

  @Post('salida')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  salida(@Body () createParqueaderoDto: CreateParqueaderoDto) {
    return this.parqueaderoService.salida(createParqueaderoDto);
  }


}
