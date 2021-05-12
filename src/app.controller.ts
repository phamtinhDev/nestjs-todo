import { Controller, Post, Body, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './models/user/dto/login.dto';
import { AuthService } from './authentication/auth.service';
import CreateUserDto from './models/user/dto/createUser.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    readonly appService: AppService,
    readonly authService: AuthService,
  ) {}

  @Get('/favicon.ico')
  favicon(@Res() res: Response) {
    return res.status(204).end();
  }

  @Get()
  @Render('page/index')
  home() {}

  @Get('login')
  @Render('pages/login')
  async loginUI() {}

  @Post('login')
  async login(@Body() datalogin: LoginDto) {
    return this.authService.login(datalogin);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
