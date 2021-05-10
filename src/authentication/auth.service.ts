import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '../models/user/user.service';
import { JwtPayload } from '../models/user/dto/jwtPayload.dto';
import { CreateUserDto } from '../models/user/dto/createUser.dto';
import UserEntity from '../models/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: CreateUserDto): Promise<any> {
    const newUser = await this.usersService.create(userData);
    return newUser;
  }

  async loginWithPassportLocal(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user || user.password !== password) return null;

    delete user.password;

    return user;
  }

  async loginWithPassportJwt(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user) throw new UnauthorizedException();

    const passwordMatches = await this.comparePassword(password, user.password);

    if (!passwordMatches) throw new UnauthorizedException();

    const payload = { email: user.email, userId: user.id };

    return { access_token: this.generateJwt(payload) };
  }

  async generateJwt(payload: JwtPayload): Promise<any> {
    return this.jwtService.signAsync(payload);
  }

  async comparePassword(password: string, storePassword: string): Promise<any> {
    return bcrypt.compare(password, storePassword);
  }
}
