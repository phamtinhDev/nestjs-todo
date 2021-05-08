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
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    return res.status(HttpStatus.OK).json('Đăng nhập thành công!');
  }
}
