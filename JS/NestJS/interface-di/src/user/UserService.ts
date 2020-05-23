import { UserRepository } from './UserRepository';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './User';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  getUser(id: number): User {
    return this.userRepository.findById(id);
  }
}