import { Module } from '@nestjs/common';
import { SocketGateway } from './sockets.gateway';
import { WsAuthGuard } from 'src/auth/web-sockets/ws-auth.guard';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [ChatModule],
  providers: [SocketGateway, WsAuthGuard],
})
export class SocketsModule {}
