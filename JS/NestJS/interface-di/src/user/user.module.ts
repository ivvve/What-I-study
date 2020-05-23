import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserRepository } from './UserRepository';
import { InMemoryUserRepository } from './InMemoryUserRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: InMemoryUserRepository }
  ],
})
export class UserModule {}