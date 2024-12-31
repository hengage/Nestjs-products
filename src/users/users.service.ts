import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string, select?: Prisma.UserSelect) {
    return this.prisma.user.findUnique({
      where: { email },
      select,
    });
  }

  findById(id: string, select?: Prisma.UserSelect) {
    return this.prisma.user.findUnique({
      where: { id },
      select,
    });
  }
}
