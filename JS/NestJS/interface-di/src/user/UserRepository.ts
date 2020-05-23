import { User } from './User';

export interface UserRepository {
  findById(id: number): User | null;
}