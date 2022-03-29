import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './../report/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  //Note -  arrow function is used for Report entity to be defined
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
