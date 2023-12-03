import { IsEmail } from 'class-validator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersservice: UsersService,
        private readonly jwtservice: JwtService
    ){}

    async register(RegisterDto: RegisterDto){

        // Encontrar usuarios duplicados
        const user = await this.usersservice.findOneByEmail(RegisterDto.email);
        if (user){
            throw new BadRequestException('User already exists');
        }

        // Creacion de usuario
        return await this.usersservice.create({
            ...RegisterDto,
            password: await bcryptjs.hashSync(RegisterDto.password, 10),
        });
    }

    async login(LoginDto: LoginDto){
        // Encontrar email
        const user = await this.usersservice.findOneByEmail(LoginDto.email);
        if (!user){
            throw new UnauthorizedException('Correo invalido');
        }

        const isPasswordValid = await bcryptjs.compare(LoginDto.password, user.password);
        if (!isPasswordValid){
            throw new UnauthorizedException('Contraseña invalida');
        }

        // Buscar el id del usuario en base a su email
        const usuario = await this.usersservice.findOneByEmail(LoginDto.email);
        const id = usuario.id;
        const nombre = usuario.name;
        const role = usuario.role;

        // Generar token
        const payload = { email: user.email, role: user.role, id: usuario.id }; // Datos que se van a guardar en el token
        const token = await this.jwtservice.signAsync(payload);

        

        return {token, nombre, role};
    }

async profile ({email, role}): Promise<{ email: string; role: string; }> {
    // ---------Me puede servir----------------
    // if (role !== 'admin'){
    //     throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
    // }
    
    return await this.usersservice.findOneByEmail(email);
}

}
