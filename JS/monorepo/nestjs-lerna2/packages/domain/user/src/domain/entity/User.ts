import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserToken } from './UserToken';

export class User {
  private id: UserId;
  private name: UserName;
  private token: UserToken;
  private deleted: boolean;

  constructor(name: UserName) {
    this.name = name;
    this.token = UserToken.generateToken();
    this.deleted = false;
  }

  setUserId(userId: UserId): void {
    if (this.id) {
      throw new Error('ID already is set');
    }

    this.id = userId;
  }

  delete(): void {
    this.deleted = true;
  }

  isSameId(userId: UserId): boolean {
    return this.id.equals(userId);
  }

  isDeleted(): boolean {
    return this.deleted;
  }

  toJson() {
    return Object.assign({}, this);
  }
}
