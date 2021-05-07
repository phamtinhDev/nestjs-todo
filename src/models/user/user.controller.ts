import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { serialize } from 'class-transformer';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this._userService.create(body);
      return res.status(HttpStatus.OK).json({ data: serialize(user) });
    } catch (error) {
      console.error(`------- error ------- `);
      console.error(error);
      console.error(`------- error ------- `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @Get(':id')
  async findUserById() {}

  @Get(':email')
  async findUserByEmail() {}

  @Get()
  async findAllUser() {}
}
