import {Body, Controller, Post, Req, UseGuards, ValidationPipe} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {User} from "./user.entity";
import {AccessTokenDto} from "./dto/access-token.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/sign-up')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    return this.authService.signUp(username, password);
  }

  @Post('/sign-in')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<AccessTokenDto> {
    const { username, password } = authCredentialsDto;
    return this.authService.signIn(username, password);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req-----------');
    console.log(req);
  }
}
