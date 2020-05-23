import { UserRepository } from './UserRepository';
import { Injectable } from '@nestjs/common';
import { User } from './User';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users: { [userId: string]: User } = {};
  
  findById(id: number): User | null {
    const user = this.users[id];
    return !!user ? user : null;
  }
}