import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";
import * as config from 'config';

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  console.log(config.get('server'));

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error', 'debug'] // log level 정의
  });
  await app.listen(3000);

  logger.log('>> Application initialized on port 3000');
}
bootstrap();
