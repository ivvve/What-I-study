import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repository/UserRepository';
import { UserId } from '../domain/entity/UserId';

@Injectable()
export class UserDeleter {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async delete(userId: UserId): Promise<void> {
    const user = await this.userRepository.findByIdOrThrow(userId);
    user.delete();
  }
}
