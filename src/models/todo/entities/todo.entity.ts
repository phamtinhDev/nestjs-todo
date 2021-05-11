import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
class Todo extends BaseEntity {
  @Column({ type: 'text' })
  taskName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamptz' })
  dueDate: Date;
}

export default Todo;
