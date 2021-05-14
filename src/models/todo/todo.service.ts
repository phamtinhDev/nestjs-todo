import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from './dto/createTodo.dto';
import TodoEntity from './entities/todo.entity';
import * as moment from 'moment';
import UpdateTodoDto from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(createData: CreateTodoDto): Promise<any> {
    await this.todoRepository
      .createQueryBuilder()
      .insert()
      .into(TodoEntity)
      .values([
        {
          ...createData,
          dueDate: moment(createData.dueDate, 'HH:mm DD/MM/YYYY').format(),
        },
      ])
      .execute();

    return { message: 'Tạo công việc thành công!' };
  }

  async readAll(): Promise<any[]> {
    const todos = await this.todoRepository
      .createQueryBuilder('todo')
      .getMany();

    const newArray: any[] = todos.map((el: TodoEntity) => {
      return {
        ...el,
        piority: this.setPiority(el.piority),
        dueDate: moment(el.dueDate).format('HH:mm DD/MM/YYYY'),
        status: this.setStatus(el.status),
      };
    });

    return newArray;
  }

  async read(id: string): Promise<any> {
    const todo = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.id = :id', { id })
      .getOne();

    return {
      ...todo,
      dueDate: moment(todo.dueDate).format('HH:mm DD/MM/YYYY'),
      status: this.setStatus(todo.status),
    };
  }

  async update(id: string, dataUpdate: UpdateTodoDto) {
    await this.todoRepository
      .createQueryBuilder()
      .update(TodoEntity)
      .set({
        ...dataUpdate,
        dueDate: moment(dataUpdate.dueDate, 'HH:mm DD/MM/YYYY').format(),
      })
      .where('id = :id', { id })
      .execute();

    return { message: 'Cập nhật thành công!' };
  }

  async updateDoneTask(ids: string[]) {
    ids.forEach(async (id) => {
      await this.todoRepository
        .createQueryBuilder()
        .update(TodoEntity)
        .set({ status: true })
        .where('id = :id', { id })
        .execute();
    });

    return { message: 'Cập nhật thành công!' };
  }

  async delete(ids: string[]) {
    await this.todoRepository
      .createQueryBuilder()
      .delete()
      .from(TodoEntity)
      .where('id IN (:...ids)', { ids })
      .execute();

    return { message: 'Xóa thành công!' };
  }

  setPiority(piority: number): string {
    switch (piority) {
      case 1:
        return 'Low';
      case 2:
        return 'Default';
      case 3:
        return 'High';
      default:
        return '';
    }
  }

  setStatus(status: boolean): string {
    switch (status) {
      case true:
        return 'Đã hoàn thành';
      case false:
        return 'Chưa hoàn thành';
      default:
        return '';
    }
  }
}
