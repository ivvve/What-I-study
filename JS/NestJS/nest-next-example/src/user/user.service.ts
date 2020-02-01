import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users = [
    new User(uuid(), 'devson', 30),
    new User(uuid(), 'chris', 28),
    new User(uuid(), 'iris', 30)
  ]

  getUsers(): User[] {
    return this.users;
  }
}
