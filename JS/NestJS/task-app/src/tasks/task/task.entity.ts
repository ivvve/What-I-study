import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task-status.enum";
import {User} from "../../auth/user/user.entity";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  constructor(title: string, description: string, user: User) {
    super();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
    this.user = user;
  }

  changeStatus(status: TaskStatus) {
    this.status = status;
  }
}
