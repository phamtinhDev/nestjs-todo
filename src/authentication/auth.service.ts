import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../models/user/user.service';
import { CreateUserDto } from '../models/user/dto/createUser.dto';
import { LoginDto } from 'src/models/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: CreateUserDto): Promise<any> {
    try {
      await this.usersService.create(userData);
      return { message: 'Tạo tài khoản thành công!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(dataLogin: LoginDto) {
    try {
      const { email, password } = dataLogin;

      const user = await this.usersService.getByEmail(email);

      if (!user && !(await user.comparePassword(password))) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng!');
      }

      const payload = { username: user.userName, userId: user.id };

      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async loginWithPassportLocal(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getByEmail(email);

      if (!user && !(await user.comparePassword(password))) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng!');
      }

      delete user.password;

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
