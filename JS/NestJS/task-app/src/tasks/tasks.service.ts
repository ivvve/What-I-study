import {Injectable, NotFoundException} from "@nestjs/common";
import {TaskRepository} from "./task/task.repository";
import {Task} from "./task/task.entity";
import {TaskStatus} from "./task/task-status.enum";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../auth/user/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  getAllTasks(user: User): Promise<Task[]> {
    return this.taskRepository.find({ user });
  }

  getFilteredTasks(user: User, status: TaskStatus, search: string): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

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

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id }
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async createTask(title: string, description: string, user: User): Promise<Task> {
    const task = await this.taskRepository.save(new Task(title, description, user));
    delete task.user;
    return task;
  }

  async deleteTask(id: number, user: User): Promise<boolean> {
    const task = await this.getTaskById(id, user);
    await this.taskRepository.remove(task);
    return true;
  }

  async updateTask(id: number, user: User, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.changeStatus(status);
    return task.save();
  }
}
