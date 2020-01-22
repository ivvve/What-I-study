import {buildSchema, prop} from "@typegoose/typegoose";
import {BlockRelationshipState} from "./block-relationship-state.enum";
import {ConflictException} from "@nestjs/common";

export class BlockRelationship {
  @prop({ enum: BlockRelationshipState })
  private state: BlockRelationshipState;

  @prop()
  private blocked_at: Date;

  @prop()
  private got_locked_at: Date;

  constructor() {
    this.state = BlockRelationshipState.NONE;
  }

  block(target: BlockRelationship): void {
    if (this.isBlocking() || target.isBlocked()) {
      throw new ConflictException();
    }

    this.state = BlockRelationshipState.BLOCKING;

    if (!target.isBlocking()) {
      target.state = BlockRelationshipState.BLOCKED;
    }

    this.blocked_at = new Date();
    target.got_locked_at = new Date();
  }

  unblock(target: BlockRelationship): void {
    if (!this.isBlocking()) {
      throw new ConflictException();
    }

    this.state = BlockRelationshipState.NONE;

    if (target.isBlocked()) {
      target.state = BlockRelationshipState.NONE;
    }
  }

  private isBlocking(): boolean {
    return (this.state === BlockRelationshipState.BLOCKING);
  }

  private isBlocked(): boolean {
    return (this.state === BlockRelationshipState.BLOCKED);
  }
}

export const BlockRelationshipSchema = buildSchema(BlockRelationship);
