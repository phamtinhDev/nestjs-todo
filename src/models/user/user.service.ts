import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import UserEntity from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltOrRounds);

    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
