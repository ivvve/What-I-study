import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user/user.repository";
import {User} from "./user/user.entity";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {AccessTokenDto} from "./dto/access-token.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ username });

    if (existingUser) {
      throw new ConflictException(`User with the username(${username}) is already existing`);
    }

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const user = User.newUser(username, password, salt);
    return this.userRepository.save(user);
  }

  async signIn(username: string, password: string): Promise<AccessTokenDto> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await user.isPasswordMatched(password);

    if (!passwordMatched) {
      throw new UnauthorizedException('password not matched');
    }

    const payload = { id: user.id, username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
