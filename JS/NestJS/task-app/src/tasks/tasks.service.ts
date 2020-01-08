import {Injectable, NotFoundException} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getFilteredTasks(status: TaskStatus, search: string): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.description LIKE :search OR task.title LIKE :search)',
        { search: `%${search}%` });
    }

    return query.getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async createTask(title: string, description: string, user: User): Promise<Task> {
    console.log(user);
    const task = await this.taskRepository.save(new Task(title, description, user));
    delete task.user;
    return task;
  }

  async deleteTask(id: number): Promise<boolean> {
    // const result = await this.taskRepository.delete(id);
    // if (result.affected < 1) {
    //   throw new NotFoundException();
    // }
    // return true;

    const task = await this.getTaskById(id);
    await this.taskRepository.remove(task);
    return true;
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.changeStatus(status);
    return task.save();
  }
}
