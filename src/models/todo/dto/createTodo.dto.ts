import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  taskName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  dueDate: string;
}

export default CreateTodoDto;
