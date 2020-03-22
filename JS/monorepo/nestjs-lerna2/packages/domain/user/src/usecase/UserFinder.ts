import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repository/UserRepository';
import { UserId } from '../domain/entity/UserId';

@Injectable()
export class UserFinder {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUserInformation(userId: string) {
    const user = await this.userRepository.findByIdOrThrow(new UserId(userId));
    return user.toJson();
  }
}
