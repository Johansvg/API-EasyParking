import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/enums/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

interface RequestWithUser extends Request {
    user: {
        email: string,
        role: string,
    }
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authservice: AuthService) {}
    
    @Post('register')
    register(
        @Body()
        registerDto : RegisterDto
    ){
        return this.authservice.register(registerDto);

    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ){
        return this.authservice.login(loginDto);
    }

    // Con el decorador auth (valida por separado)
    @Get('profile')
    @Auth(Role.Admin)
    profile(@ActiveUser() user: UserActiveInterface){
        return this.authservice.profile(user);
    }

    // Sin el decorador auth (junta todas las validaciones)
    // @Get('profile')
    // @Roles(Role.User)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(@Req() req: RequestWithUser){
    //     return this.authservice.profile({
    //         email: req.user.email,
    //         role: req.user.role,
    //     });
    // }
}


