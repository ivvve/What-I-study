import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as Docker from 'dockerode';
new Docker().createContainer({
  
})

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
