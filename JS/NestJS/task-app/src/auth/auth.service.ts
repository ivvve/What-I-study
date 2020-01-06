import {ConflictException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async signUp(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ username });

    if (existingUser) {
      throw new ConflictException(`User with the username(${username}) is already existing`);
    }

    const user = User.newUser(username, password);
    return this.userRepository.save(user);
  }
}
