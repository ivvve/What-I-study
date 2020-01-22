import {Controller, Post} from "@nestjs/common";
import {FriendshipService} from "../app/friendship.service";

@Controller('friendship')
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService
  ) {}

  @Post('send')
  sendFriendRequest() {
    const from = 'u1';
    const to = 'u2';
    return this.friendshipService.sentFriendRequest(from, to);
  }

  @Post('accept')
  acceptFriendRequest() {
    const from = 'u1';
    const to = 'u2';
    return this.friendshipService.acceptFriendRequest(from, to)
  }

  @Post('unfriend')
  unfriend() {
    const from = 'u1';
    const to = 'u2';
    return this.friendshipService.unfriend(from, to);
  }
}
