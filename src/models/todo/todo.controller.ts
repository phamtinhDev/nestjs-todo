import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import CreateTodoDto from './dto/createTodo.dto';
import TodoEntity from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Get()
  @Render('pages/index')
  async todoManagerUI() {
    const todos = await this._todoService.readAll();
    return {
      page: 'manage-pages/index',
      title: 'Quản lý trang',
      titlePage: 'Quản lí công việc',
      todos,
    };
  }

  @Get('create')
  @Render('pages/index')
  async createTaskUI() {
    return {
      page: 'manage-pages/create',
      title: 'Quản lý trang',
      titlePage: 'Tạo mới công việc',
    };
  }

  @Post()
  async createTask(@Body() createData: CreateTodoDto): Promise<TodoEntity> {
    return this._todoService.create(createData);
  }

  @Get('edit/:id')
  @Render('pages/index')
  async updateTaskUI(@Param('id') id: string) {
    const todo = await this._todoService.read(id);
    return {
      page: 'manage-pages/edit',
      title: 'Quản lý trang',
      titlePage: 'Chỉnh sửa công việc',
      todo,
    };
  }

  @Put()
  async updateTask() {}
}
