import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/constants';
import { extractTokenFromHeader } from './auth.lib';
import { Msg } from 'src/utils/message';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(Msg.ERROR_NO_AUTH_TOKEN());
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_CONSTANTS.SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(Msg.ERROR_INVALID_AUTH_TOKEN());
    }
    return true;
  }
}
