import { Controller } from '@nestjs/common';

import { Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body() data: RegisterDto) {
    return this.authService.createUser(data);
  }
}
