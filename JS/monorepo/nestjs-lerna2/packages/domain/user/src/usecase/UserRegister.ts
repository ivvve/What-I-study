import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRegister {
  constructor(
    private readonly userRepository: UserRegister,
  ) {}
}
