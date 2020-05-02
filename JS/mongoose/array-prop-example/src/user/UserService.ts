import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from './entity/User';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly User: ModelType<User>
  ) {}

  addUser(name): Promise<User> {
    const user = new User(name);
    return new this.User(user).save();
  }

  async addUserAddress(name: string, city: string, detail: string): Promise<User> {
    const user = await this.getUserByName(name);

    user.addAddress(city, detail);
    return user.save();
  }

  async updateUserAddress(name: string, addressIndex: number, city: string, detail: string): Promise<User> {
    const user = await this.getUserByName(name);
    user.updateAddress(addressIndex, city, detail);
    return user.save();
  }

  private async getUserByName(name: string): Promise<DocumentType<User>> {
    const user = await this.User
      .findOne({ name })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
