import { Module } from '@nestjs/common';
import { SocketGateway } from './sockets.gateway';
import { WsAuthGuard } from 'src/auth/web-sockets/ws-auth.guard';

@Module({
  providers: [SocketGateway, WsAuthGuard],
})
export class SocketsModule {}
