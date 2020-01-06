import { Module } from '@nestjs/common';
import {TasksController} from "./tasks.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TaskRepository} from "./task.repository";
import {TasksService} from "./tasks.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
