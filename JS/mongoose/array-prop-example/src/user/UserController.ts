import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './entity/User';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  addUser(@Body('name') name: string): Promise<User> {
    return this.userService.addUser(name);
  }

  @Post(':name/addresses')
  addUserAddress(
    @Param('name') name: string,
    @Body('city') city: string, @Body('detail') detail: string
  ): Promise<User> {
    return this.userService.addUserAddress(name, city, detail);
  }

  @Patch(':name/addresses/:addressIndex')
  updateUserAddress(
    @Param('name') name: string, @Param('addressIndex', ParseIntPipe) addressIndex: number,
    @Body('city') city: string, @Body('detail') detail: string
  ): Promise<User> {
    return this.userService.updateUserAddress(name, addressIndex, city, detail);
  }
}
