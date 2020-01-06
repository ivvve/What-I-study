import {IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // @Matches(regex)
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
