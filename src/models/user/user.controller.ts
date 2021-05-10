import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUser(@Res() res: Response) {
    try {
      const users = await this._userService.getAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(`------- error ------- `);
      console.error(error);
      console.error(`------- error ------- `);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
