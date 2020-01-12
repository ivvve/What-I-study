import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import {Task} from "./task/task.entity";
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import * as _ from 'lodash';
import {TaskStatusValidationPipe} from "./pipes/task-status-validation.pipe";
import {TasksService} from "./tasks.service";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/user/get-user.decorator";
import {User} from "../auth/user/user.entity";

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(
    private readonly tasksService:TasksService
  ) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) getTasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.log('TasksController.getAllTasks called');
    this.logger.debug(`user (${user.username}) try to get all task`);
    this.logger.verbose(`filter ${JSON.stringify(getTasksFilterDto)}`);

    if (_.isEmpty(getTasksFilterDto)) {
      return this.tasksService.getAllTasks(user);
    }

    const { status, search } = getTasksFilterDto;
    return this.tasksService.getFilteredTasks(user, status, search);
  }

  @Get('/:id')
  getTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    return this.tasksService.createTask(title, description, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<boolean> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTask(id, user, updateTaskDto.status);
  }
}
