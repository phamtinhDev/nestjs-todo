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
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this._userService.create(body);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(`------- error ------- `);
      console.error(error);
      console.error(`------- error ------- `);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findUserById() {}

  @Get(':email')
  async findUserByEmail() {}

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
