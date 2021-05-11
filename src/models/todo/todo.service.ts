import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from './dto/createTodo.dto';
import TodoEntity from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createData: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.create(createData);
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  async readAll() {}

  async read() {}

  async update() {}

  async delete() {}
}
