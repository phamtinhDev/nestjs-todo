import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';
import * as bcrypt from 'bcrypt';

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
  userName: string;

  @Column({ type: 'text', unique: true })
  @Expose()
  email: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;
