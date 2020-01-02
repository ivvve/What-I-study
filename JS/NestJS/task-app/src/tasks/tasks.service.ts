import {Injectable} from "@nestjs/common";
import {TasksModel, TaskStatus} from "./tasks.model";
import * as uuid from 'uuid/v4';

@Injectable()
export class TasksService {
  private readonly tasks: TasksModel[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.tasks.push({ id: uuid(), title: `title${i}`, description: `desc:${i}`, status: TaskStatus.OPEN });
    }
  }

  getAllTasks(): TasksModel[] {
    return this.tasks;
  }

  createTask(title: string, description: string): TasksModel {
    const id = uuid();
    const task = {id: id, title: title, description: description, status: TaskStatus.OPEN};
    this.tasks.push(task);

    return task;
  }
}
