import { Controller, HttpStatus, Body, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './auth.dto';
import { Msg } from 'src/utils/message';
import { formatResponse } from 'src/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserData: CreateUserDto) {
    const result = await this.authService.createUser(createUserData);
    return formatResponse(
      HttpStatus.CREATED,
      Msg.USER_REGISTERED_SUCCESS(),
      result,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: LoginDto) {
    const result = await this.authService.loginUser(loginData);
    return formatResponse(HttpStatus.OK, Msg.LOGIN_SUCCESS(), result);
  }
}
