import {buildSchema, prop} from "@typegoose/typegoose";
import {Friendship, FriendshipSchema} from "./friendship/friendship.entity";
import {BlockRelationship, BlockRelationshipSchema} from "./block-relationship/block-relationship.entity";
import {ConflictException} from "@nestjs/common";

export class Relationship {
  @prop({ required: true })
  private from: string;

  @prop({ required: true })
  private to: string;

  @prop({ _id: false })
  private friendship: Friendship;

  @prop({ _id: false })
  private block_relationship: BlockRelationship;

  @prop()
  private created_at: Date;

  @prop()
  private updated_at: Date;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
    this.created_at = new Date();
  }

  block(target: Relationship): void {
    this.validateTarget(target);

    if (!this.block_relationship || !target.block_relationship) {
      this.block_relationship = new BlockRelationship();
      target.block_relationship = new BlockRelationship();
    }

    this.block_relationship.block(target.block_relationship);

    if (this.friendship && target.friendship) {
      this.friendship.resetFriendshipWith(target.friendship);
    }
  }

  unblock(target: Relationship): void {
    this.validateTarget(target);

    if (!this.block_relationship || !target.block_relationship) {
      throw new ConflictException();
    }

    this.block_relationship.unblock(target.block_relationship);

    if (this.friendship && target.friendship) {
      this.friendship.resetFriendshipWith(target.friendship);
    }
  }

  sendFriendRequest(target: Relationship): void {
    this.validateTarget(target);

    if (!this.friendship || !target.friendship) {
      this.friendship = new Friendship();
      target.friendship = new Friendship();
    }

    this.friendship.sendFriendRequestTo(target.friendship);
  }

  acceptFriendRequest(target: Relationship): void {
    this.validateTarget(target);

    if (!this.friendship || !target.friendship) {
      throw new ConflictException();
    }

    this.friendship.acceptFriendRequestOf(target.friendship);
  }

  unfriend(target: Relationship): void {
    this.validateTarget(target);

    if (!this.friendship || !target.friendship) {
      throw new ConflictException();
    }

    this.friendship.unfriend(target.friendship);
  }

  private validateTarget(target: Relationship) {
    if ((this.from !== target.to) || (this.to !== target.from)) {
      throw new ConflictException();
    }
  }
}

export const RelationshipSchema = buildSchema(Relationship);
RelationshipSchema.pre('save', function () {
  // @ts-ignore
  this.updatedAt = new Date();
});
