import { Module } from '@nestjs/common';
import { SocketGateway } from './sockets.gateway';

@Module({
  providers: [SocketGateway],
})
export class SocketsModule {}
