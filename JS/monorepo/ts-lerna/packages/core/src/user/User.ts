import { v4 as uuid } from 'uuid';
import { StringUtils } from '@devson/common';

export class User {
  private id: string;
  private name: string;
  private uniqueToken: string;

  constructor(id: string, name: string) {
    if (StringUtils.isBlank(id)) {
      throw new Error('ID is blank');
    }
    this.id = id;
    this.name = name;
    this.uniqueToken = uuid();
  }

  toJson() {
    return Object.assign(this);
  }
}
