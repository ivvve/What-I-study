import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import {UserModule} from "./user/user.module";

@Module({
  imports: [
    RenderModule,
    UserModule
  ],
  controllers: []
})
export class AppModule {}
