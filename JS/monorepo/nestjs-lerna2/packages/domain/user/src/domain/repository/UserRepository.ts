import { Injectable } from '@nestjs/common';
import { User, UserId } from '../entity';

@Injectable()
export class UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<User> {
    user.setUserId(UserId.generateToken());
    this.users.push(user);
    return user;
  }

  async findById(userId: UserId): Promise<(User | null)> {
    const loop = this.users.length;
    for (let i = 0; i < loop; i++) {
      const user = this.users[i];
      if (user.isSameId(userId)) {
        return user;
      }
    }

    return null;
  }

  async findByIdOrThrow(userId: UserId): Promise<User> {
    const user = await this.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
