import { v4 as uuid } from 'uuid';

export class UserToken {
  private readonly token: string;

  private constructor(token: string) {
    this.token = token;
  }

  static generateToken(): UserToken {
    return new UserToken(uuid());
  }
}
