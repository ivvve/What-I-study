import { v4 as uuid } from 'uuid';

export class UserId {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  static generateToken(): UserId {
    return new UserId(uuid());
  }

  equals(userId: UserId): boolean {
    return this.id === userId.id;
  }
}
