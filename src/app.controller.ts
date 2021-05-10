import {
  Controller,
  Post,
  Res,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { LoginDto } from './models/user/dto/login.dto';
import { AuthService } from './authentication/auth.service';
import CreateUserDto from './models/user/dto/createUser.dto';

@Controller()
export class AppController {
  constructor(
    readonly appService: AppService,
    readonly authService: AuthService,
  ) {}

  @Post('auth/register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.authService.register(body);
    return res.status(HttpStatus.OK).json('Tạo tài khoản thành công!');
  }

  @Post('auth/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('Đăng nhập thành công!');
  }

  @Post('api/login')
  async apiLogin(@Body() body: LoginDto, @Res() res: Response): Promise<any> {
    const { email, password } = body;

    const loginResult = await this.authService.loginWithPassportJwt(
      email,
      password,
    );

    return res.status(HttpStatus.OK).json({ token: loginResult });
  }
}
