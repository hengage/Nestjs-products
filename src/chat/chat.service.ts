import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  async createChatRoom(orderId: string) {
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

  async createMessage(chatRoomId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: {
        content,
        chatRoom: { connect: { id: chatRoomId } },
        sender: { connect: { id: senderId } },
      },
      include: { sender: true },
    });
  }

  async getMessages(orderId: string) {
    return this.prisma.message.findMany({
      where: {
        chatRoom: { orderId },
      },
      include: { sender: true },
      orderBy: { createdAt: 'asc' },
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
