import { Controller } from '@nestjs/common';

import { Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body() creatUserData: CreateUserDto) {
    return this.authService.createUser(creatUserData);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.authService.loginUser(loginData);
  }
}
