import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUser() {
    return this._userService.getAll();
  }
}
