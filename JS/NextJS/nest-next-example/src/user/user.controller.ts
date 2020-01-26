import {Controller, Get, Render} from "@nestjs/common";
import {UserService} from "./user.service";
import {User} from "./user.entity";

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  // view 용
  @Render('user/user-list')
  @Get('user-list')
  userListView(): void {
  }

  // REST API
  @Get()
  getUsers(): User[] {
    return this.userService.getAllUsers();
  }
}
