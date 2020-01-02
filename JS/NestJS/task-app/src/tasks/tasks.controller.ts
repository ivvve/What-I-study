import {Body, Controller, Get, Post} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {TasksModel} from "./tasks.model";

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) {}

  @Get()
  getAllTasks(): TasksModel[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() body: { title: string, description: string }): TasksModel {
    return this.tasksService.createTask(body.title, body.description);
  }
}
