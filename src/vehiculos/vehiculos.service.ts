import { find } from 'rxjs';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VehiculosService {

  constructor (
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
    private readonly jwtservice: JwtService,
  ) { }

    async generarCodigo(){
      // Genera un código aleatorio de 4 cifras
    return Math.floor(1000 + Math.random() * 9000);
    }

  async create(createVehiculoDto: CreateVehiculoDto, token: string) {

    // verificat que no exista un vehiculo con la misma placa
    const placaDuplicada = await this.findByPlaca(createVehiculoDto.placa);
    if (placaDuplicada) {
      throw new BadRequestException('Placa ya registrada en el sistema');
    }

    // Generar codigo de acceso
    const id = await this.generarCodigo();
  
    // Verifica que el código sea único
    // const vehiculoConCodigo = await this.vehiculoRepository.findOne({ where: { id } });
    // while (vehiculoConCodigo) {
    //   id = await this.generarCodigo();
    // }
    
    // Asignar el codigo al vehiculo
    createVehiculoDto.id = id;

    

    // Asignar id de usuario al vehiculo  

    // quitar el Bearer del token
    token = token.replace('Bearer ', '');
    
    // Decodificar el token
    const payload = await this.jwtservice.verifyAsync(token);
    // const emailDueno = payload.email;
    const idDueno = payload.id;

    // Integrar email del usuario al vehiculo
    // createVehiculoDto.emailDueno = emailDueno;
    createVehiculoDto.idDueno = idDueno;

    // Creacion de vehiculo
    return await this.vehiculoRepository.save(createVehiculoDto);
  }

  async misVehiculos(token: string) {
    // Obtener id del usuario a partir del jwt
    token = token.replace('Bearer ', '');
    const payload = await this.jwtservice.verifyAsync(token);
    const idDueno = parseInt(payload.id);

    // Obtener vehiculos del usuario
    return await this.vehiculoRepository.find({ where: { idDueno } });
  }

  async vehiculoEspecifico(placa: string, token: string){
    // Obtener id del usuario a partir del jwt
    token = token.replace('Bearer ', '');
    const payload = await this.jwtservice.verifyAsync(token);
    const idDueno = parseInt(payload.id);

    // Obtener vehiculo a partir de la placa
    const vehiculo = await this.vehiculoRepository.findOne({ where: { placa } });

    // Verificar que el vehiculo exista
    if (!vehiculo) {
      throw new BadRequestException('El vehiculo no existe');
    }

    // Verificar que el vehiculo pertenezca al usuario
    if (vehiculo.idDueno != idDueno) {
      throw new BadRequestException('El vehiculo no pertenece al usuario');
    }

    // Retornar vehiculo
    return vehiculo;
  }

  async editarMiVehiculo(placa: string, token: string, updateVehiculoDto: UpdateVehiculoDto){
    // Obtener id del usuario a partir del jwt
    token = token.replace('Bearer ', '');
    const payload = await this.jwtservice.verifyAsync(token);
    const idDueno = parseInt(payload.id);

    // Obtener vehiculo a partir de la placa
    const vehiculo = await this.vehiculoRepository.findOne({ where: { placa } });

    // Verificar que el vehiculo exista
    if (!vehiculo) {
      throw new BadRequestException('El vehiculo no existe');
    }
    
    // Verificar que el vehiculo pertenezca al usuario
    if (vehiculo.idDueno != idDueno) {
      throw new BadRequestException('El vehiculo no pertenece al usuario');
    }

    // Actualizar vehiculo
    return this.vehiculoRepository.update({ placa }, updateVehiculoDto);
  }

  async eliminarMiVehiculo(placa: string, token: string){
    // Obtener id del usuario a partir del jwt
    token = token.replace('Bearer ', '');
    const payload = await this.jwtservice.verifyAsync(token);
    const idDueno = parseInt(payload.id);

    // Obtener vehiculo a partir de la placa
    const vehiculo = await this.vehiculoRepository.findOne({ where: { placa } });

    // Verificar que el vehiculo exista
    if (!vehiculo) {
      throw new BadRequestException('El vehiculo no existe');
    }
    
    // Verificar que el vehiculo pertenezca al usuario
    if (vehiculo.idDueno != idDueno) {
      throw new BadRequestException('El vehiculo no pertenece al usuario');
    }

    // Eliminar vehiculo
    return this.vehiculoRepository.delete({ placa });
  }
  
  findByPlaca(placa: string) {
    return this.vehiculoRepository.findOneBy({ placa });
  }

  async findAll() {
    return await this.vehiculoRepository.find();
  }
  
  async findOne(id: number) {
    return await this.vehiculoRepository.findOneBy({ id });
  }



  update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoRepository.update({ id }, updateVehiculoDto);
  }

  remove(id: number) {
    return this.vehiculoRepository.delete({ id });
  }
}
