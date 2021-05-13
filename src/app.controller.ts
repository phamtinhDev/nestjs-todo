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
  @Render('pages/login')
  getLogin(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/todo');
    }

    return { message: req.flash('error') };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Redirect('/todo')
  async postLogin() {}

  @Get('register')
  @Render('pages/register')
  getRegister(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/todo');
    }

    return { message: req.flash('error') };
  }

  @Post('register')
  @Redirect('/login')
  async postRegister(@Body() createData: CreateUserDto) {
    return this.authService.register(createData);
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
