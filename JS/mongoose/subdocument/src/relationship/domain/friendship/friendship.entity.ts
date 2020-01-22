import {FriendshipState} from "./friendship-state.enum";
import {buildSchema, prop} from "@typegoose/typegoose";
import {ConflictException} from "@nestjs/common";

export class Friendship {
  @prop({ enum: FriendshipState })
  private state: FriendshipState;

  @prop()
  private requested_at: Date;

  @prop()
  private wereFriends_at: Date;

  constructor() {
    this.state = FriendshipState.NONE;
  }

  sendFriendRequestTo(target: Friendship): void {
    if ((this.state !== FriendshipState.NONE) || (target.state !== FriendshipState.NONE)) {
      throw new ConflictException()
    }

    this.state = FriendshipState.SENT_REQUEST;
    target.state = FriendshipState.REQUEST_RECEIVED;

    this.requested_at = new Date();
  }

  acceptFriendRequestOf(target: Friendship): void {
    if ((this.state !== FriendshipState.REQUEST_RECEIVED) || (target.state !== FriendshipState.SENT_REQUEST)) {
      throw new ConflictException();
    }

    this.state = FriendshipState.FRIEND;
    target.state = FriendshipState.FRIEND;

    this.wereFriends_at = new Date();
    target.wereFriends_at = new Date();
  }

  unfriend(target: Friendship): void {
    if ((this.state !== FriendshipState.FRIEND) || (target.state !== FriendshipState.FRIEND)) {
      throw new ConflictException();
    }

    this.state = FriendshipState.NONE;
    target.state = FriendshipState.NONE;
  }

  resetFriendshipWith(target: Friendship): void {
    this.state = FriendshipState.NONE;
    target.state = FriendshipState.NONE;
  }
}

export const FriendshipSchema = buildSchema(Friendship);
