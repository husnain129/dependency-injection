import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  LogInsert() {
    console.log('Inserted user with id:', this.id);
  }

  @AfterUpdate()
  LogUpdate() {
    console.log('Updated user with id:', this.id);
  }

  @AfterRemove()
  LogRemove() {
    console.log('Removed user with id:', this.id);
  }
}
