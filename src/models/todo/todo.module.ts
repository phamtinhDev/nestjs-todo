import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import TodoEntity from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodoService],
  exports: [TodoService, TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
})
export class TodoModule {}
