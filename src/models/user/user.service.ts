import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userData: CreateUserDto): Promise<UserEntity> {
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
