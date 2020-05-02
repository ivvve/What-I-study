import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user/entity/User';
import { UserController } from './user/UserController';
import { UserService } from './user/UserService';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:8100/user', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }),
    MongooseModule.forFeature([
      { collection: 'users', name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
