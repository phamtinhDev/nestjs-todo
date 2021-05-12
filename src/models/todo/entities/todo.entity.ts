import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
class Todo extends BaseEntity {
  @Column({ type: 'text' })
  taskName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  piority: number;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
  status: boolean;
}

export default Todo;
