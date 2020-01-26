import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {User} from "./user.entity";
import { v4 as uuid } from 'uuid';
@Injectable()
export class UserRepository {
  private users: User[] = [
    new User(uuid(), 'devson', 30),
    new User(uuid(), 'Chris', 28)
  ];

  getAll(): User[] {
    return this.users;
  }

  save(user: User): void {
    if (this.isIdDuplicated(user.id)) {
      throw new ConflictException();
    }

    this.users.push(user);
  }

  update(user: User): void {
    const savedUser = this.findExistsUserById(user.id);

    const { name, age } = user;
    savedUser.name = name;
    savedUser.age = age;
  }

  delete(id: string): void {
    this.findExistsUserById(id);

    this.users = this.users.filter(user => !user.isSameId(id));
  }

  private isIdDuplicated(id: string): boolean {
    return this.users.some(user => user.isSameId(id));
  }

  private findExistsUserById(id: string): User {
    const user = this.users.find(user => user.isSameId(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
