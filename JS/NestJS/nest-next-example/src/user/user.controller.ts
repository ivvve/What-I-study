import {Controller, Get, Render} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Render('data/data-list')
  @Get()
  userList() {
    const users = this.userService.getUsers();
    return { users };
  }
}
