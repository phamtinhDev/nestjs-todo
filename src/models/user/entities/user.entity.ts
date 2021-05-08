import { Entity, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity()
class User extends BaseEntity {
  @Column({ type: 'text' })
  @Expose()
  firstName: string;

  @Column({ type: 'text' })
  @Expose()
  lastName: string;

  @Column({ type: 'text', unique: true })
  @Expose()
  email: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;
}

export default User;
