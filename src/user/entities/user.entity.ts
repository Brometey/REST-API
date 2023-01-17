import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ColumnEntity } from 'src/column/entities/column.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ColumnEntity, (column) => column.owner_, { cascade: true })
  columns_: ColumnEntity[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await hash(this.password, 10);
  }
}
