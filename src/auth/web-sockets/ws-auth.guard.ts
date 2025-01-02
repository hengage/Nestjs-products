import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { extractTokenFromHeader } from '../auth.lib';
import { JWT_CONSTANTS } from 'src/constants';
import { Socket } from 'socket.io';
import { Msg } from 'src/utils/message';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = extractTokenFromHeader(client);

    if (!token) {
      throw new WsException(Msg.ERROR_NO_AUTH_TOKEN());
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: JWT_CONSTANTS.SECRET,
      });
      client.data.user = payload;
      return true;
    } catch {
      throw new WsException(Msg.ERROR_INVALID_AUTH_TOKEN());
    }
  }
}
