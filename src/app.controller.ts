import { Controller, Post, Body } from '@nestjs/common';
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

  @Post('login')
  async login(@Body() datalogin: LoginDto) {
    return this.authService.login(datalogin);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
