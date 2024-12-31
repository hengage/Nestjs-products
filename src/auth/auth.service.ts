import {
  ConflictException,
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
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createUser(createUserData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);

    const userExists = await this.usersService.findByEmail(
      createUserData.email,
      { email: true },
    );
    if (userExists) {
      throw new ConflictException(Msg.ERROR_USER_ALREADY_EXISTS());
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserData,
        password: hashedPassword,
      },
    });

    return excludeObjectProperties(user, ['password']);
  }

  async loginUser(loginData: LoginDto) {
    const user = await this.usersService.findByEmail(loginData.email, {
      id: true,
      email: true,
      password: true,
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
