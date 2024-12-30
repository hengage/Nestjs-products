import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(creatUserData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(creatUserData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...creatUserData,
        password: hashedPassword,
      },
    });

    return exclude(user, ['password']);
  }

  async loginUser(loginData: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return Error('User with this email does not exist');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      return Error('Incorrect password');
    }

    const token = await this.generateToken(user.id, user.email);
    // const { password, ...userWithoutPassword } = user;
    // return { user: userWithoutPassword, token };

    return {
      user: exclude(user, ['password']),
      token,
    };
  }

  async generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}

function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}
