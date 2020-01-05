import { Module } from '@nestjs/common';
import {TasksController} from "./tasks.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "../config/typeorm.config";
import {TaskRepository} from "./task.repository";
import {TasksService} from "./tasks.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
