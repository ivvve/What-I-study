import {Injectable, NotFoundException} from "@nestjs/common";
import {Task, TaskStatus} from "./task.model";
import * as uuid from 'uuid/v4';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.tasks.push({ id: uuid(), title: `title${i}`, description: `desc:${i}`, status: TaskStatus.OPEN });
    }
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks(status: TaskStatus, search: string): Task[] {
    let results = this.tasks;

    if (status) {
      results = results.filter(task => (task.status === status));
    }

    if (search) {
      results = results.filter(task => (task.description.includes(search)));
    }

    return results;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => (task.id === id));
  }

  createTask(title: string, description: string): Task {
    const id = uuid();
    const task = {id: id, title: title, description: description, status: TaskStatus.OPEN};
    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): boolean {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException();
    }

    const indexOfTask = this.tasks.indexOf(task);
    this.tasks.splice(indexOfTask, 1);
    return true;
  }

  updateTask(id: string, status: TaskStatus): boolean {
    const task = this.getTaskById(id);

    if (!task) {
      throw new NotFoundException();
    }

    task.status = status;
    return true;
  }
}
