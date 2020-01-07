import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt-payload";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'chris-secret-1234'
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log(payload);

    const user = await this.userRepository.findOne({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    console.log('validate success');
    return user;
  }
}
