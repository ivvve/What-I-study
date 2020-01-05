import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TaskStatus} from "./task-status.enum";

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

  constructor(title: string, description: string) {
    super();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
  }

  changeStatus(status: TaskStatus) {
    this.status = status;
  }
}
