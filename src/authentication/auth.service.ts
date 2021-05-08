import { Injectable } from '@nestjs/common';
import { UserService } from '../models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user || user.password !== password) return null;

    delete user.password;

    return user;
  }
}
