import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {Task} from "./task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import * as _ from 'lodash';
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService:TasksService
  ) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    console.log(getTasksFilterDto);

    if (_.isEmpty(getTasksFilterDto)) {
      return this.tasksService.getAllTasks();
    }

    const { status, search } = getTasksFilterDto;
    return this.tasksService.getFilteredTasks(status, search);
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto.status);
  }
}
