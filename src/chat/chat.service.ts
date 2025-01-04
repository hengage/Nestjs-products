import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChatRoom } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  async createChatRoom(orderId: string): Promise<ChatRoom> {
    return this.prisma.chatRoom.create({
      data: {
        order: { connect: { id: orderId } },
      },
    });
  }

  async findChatRoom(orderId: string) {
    return this.prisma.chatRoom.findUnique({
      where: { orderId },
      include: { order: true },
    });
  }

  async findById(id: string): Promise<ChatRoom> {
    return this.prisma.chatRoom.findUnique({
      where: { id },
      include: { order: true },
    });
  }

  async createMessage(chatRoomId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: {
        content,
        chatRoom: { connect: { id: chatRoomId } },
        sender: { connect: { id: senderId } },
      },
    });
  }

  async getMessages(chatRoomId: string) {
    return this.prisma.message.findMany({
      where: {
        chatRoomId,
      },
      orderBy: { createdAt: 'asc' },
      select: {
        content: true,
        senderId: true,
        createdAt: true,
      },
    });
  }

  async closeChatRoom(orderId: string, summary: string) {
    return this.prisma.chatRoom.update({
      where: { orderId },
      data: {
        isOpen: false,
        summary,
      },
    });
  }
}
