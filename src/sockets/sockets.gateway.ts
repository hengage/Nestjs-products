import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Observable } from 'rxjs';
import { UseFilters, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/auth/web-sockets/ws-auth.guard';
import { WsExceptionFilter } from 'src/auth/web-sockets/ws-exception.filter';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'events',
  transports: ['websocket'],
})
@UseGuards(WsAuthGuard)
@UseFilters(new WsExceptionFilter())
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  emit(eventName: string, data: any): void {
    this.server.sockets.emit(eventName, data);
  }

  @SubscribeMessage('open-chat')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    return { event: 'events', data };
  }

  @SubscribeMessage('send-text')
  handleEventAsync(
    @MessageBody() data: unknown,
  ): Observable<WsResponse<number[]>> {
    try {
      const response = [1, 2, 3];
      return new Observable<WsResponse<number[]>>((subscriber) => {
        subscriber.next({ event: 'sent-text', data: response });
        subscriber.complete();
      });
    } catch (error) {
      return new Observable((subscriber) => {
        subscriber.next({ event: 'send-text-error', data: [0] });
        subscriber.error(error);
      });
    }
  }
}
