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
import { ChatService } from 'src/chat/chat.service';
import { UsersService } from 'src/users/users.service';
import { ChatRoom, Message, User } from '@prisma/client';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'events',
  transports: ['websocket'],
})
@UseGuards(WsAuthGuard)
@UseFilters(new WsExceptionFilter())
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
  ) { }
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

  async handleNotifyOfNewChatRoom(
    @MessageBody() data: { orderId: string; userId: string; chatRoom: any },
  ) {
    this.server.emit('new-chat-room', {
      orderId: data.orderId,
      userId: data.userId,
      chatRoom: data.chatRoom,
    });
  }

  @SubscribeMessage('join-chat-room')
  async handleJoinChatRoom(client: Socket, payload: { orderId: string }) {
    // Check if the chat room exists, if not create it
    let chatRoom: ChatRoom = await this.chatService.findChatRoom(
      payload.orderId,
    );
    if (!chatRoom) {
      chatRoom = await this.chatService.createChatRoom(payload.orderId);
      console.log(`Chat room created for order: ${payload.orderId}`);
    }

    // Join the client to the chat room
    client.join(chatRoom.id);
    this.server.to(chatRoom.id).emit(chatRoom.id);
    console.log(`Client ${client.id} joined chat room: ${chatRoom.id}`);
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    client: Socket,
    payload: {
      chatRoomId: ChatRoom['id'];
      content: Message['content'];
      senderId: User['id'];
    },
  ) {
    const chatRoom = await this.chatService.findById(payload.chatRoomId);
    console.log({ chatRoom });
    if (!chatRoom || !chatRoom.isOpen) return;

    const message = await this.chatService.createMessage(
      chatRoom.id,
      payload.senderId,
      payload.content,
    );
    console.log({ message });

    this.server.to(payload.chatRoomId).emit('receive-message', message);
  }

  @SubscribeMessage('get-chat-room-messages')
  async handleGetMessages(
    client: Socket,
    payload: { chatRoomId: ChatRoom['id'] },
  ) {
    const messages = await this.chatService.getMessages(payload.chatRoomId);
    return { event: 'chat-room-messages', data: messages };
  }

  @SubscribeMessage('close-chat')
  async handleCloseChat(
    client: Socket,
    payload: { orderId: string; userId: string; summary: string },
  ) {
    const user = await this.usersService.findById(payload.userId);
    if (user.role !== 'ADMIN') return;

    const updatedRoom = await this.chatService.closeChatRoom(
      payload.orderId,
      payload.summary,
    );
    this.server.to(payload.orderId).emit('chat-closed', {
      roomId: updatedRoom.id,
      summary: updatedRoom.summary,
    });
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
