import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { SocketsModule } from './sockets/sockets.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, SocketsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService, ChatService],
})
export class AppModule {}
