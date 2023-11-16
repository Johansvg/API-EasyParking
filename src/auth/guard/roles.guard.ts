import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }
    
    // Si es un usuario con rol de administrador, se le permite el acceso
    // if (role === 'admin') {
    //   return true;
    // }

    // Valida que el rol del usuario sea el requerido
    const { user } = context.switchToHttp().getRequest();
    return role === user.role;

  }
}
