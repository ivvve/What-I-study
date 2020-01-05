import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Task} from "../tasks/task.entity";

// @ts-ignore
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: '8300',
  username: 'wave',
  password: 'wave1234',
  database: 'taskmanagement',
  entities: [Task],
  synchronize: true,
  logging: 'all'
};
