import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import {
  IS_PUBLIC_KEY,
  ROLES_KEY,
} from 'utils/custom_decorators/auth.decorator';
import { Role } from 'utils/enums/role.enum';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  private requiredRoles: any[];
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Handle authentication error
      throw err || new UnauthorizedException();
    }
    if (!this.requiredRoles) {
      return true;
    }
    if (!user.roles) {
      throw new UnauthorizedException();
    }

    const result = this.requiredRoles.some((role) =>
      user.roles?.includes(role),
    );
    if (result) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
