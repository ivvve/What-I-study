import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByUsername(username: string): Promise<(User | undefined)> {
    return this.findOne({ username });
  }
}
