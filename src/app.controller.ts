import {
  Controller,
  Post,
  Body,
  Get,
  Render,
  Req,
  UseGuards,
  Redirect,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './authentication/auth.service';
import CreateUserDto from './models/user/dto/createUser.dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './authentication/guards/local-auth.guard';
import { AuthenticateGuard } from './authentication/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(
    readonly appService: AppService,
    readonly authService: AuthService,
  ) {}

  @Get('login')
  getLogin(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/todo');
    }

    return res.render('pages/login');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Redirect('/todo')
  async postLogin() {}

  @Post('register')
  @Redirect('/login')
  async postRegister(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(AuthenticateGuard)
  @Get()
  @Redirect('/todo')
  getHome() {}

  @UseGuards(AuthenticateGuard)
  @Get('/logout')
  @Redirect('/login')
  getLogout(@Req() req: Request) {
    return req.logOut();
  }

  @Get('/404')
  @Render('pages/404')
  getError404() {}

  @Get('/401')
  @Render('pages/401')
  getError401() {}
}
