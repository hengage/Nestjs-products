import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { excludeObjectProperties } from 'src/utils/transform';
import { Msg } from 'src/utils/message';

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

    return excludeObjectProperties(user, ['password']);
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
      throw new NotFoundException(Msg.ERROR_USER_NOT_FOUND());
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(Msg.ERROR_INCORRECT_PASSWORD());
    }

    const token = await this.generateToken(user.id, user.email);
    return {
      user: excludeObjectProperties(user, ['password']),
      token,
    };
  }

  async generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }
}
