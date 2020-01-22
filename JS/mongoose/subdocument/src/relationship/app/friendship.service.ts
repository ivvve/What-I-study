import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {RelationshipRepository} from "../domain/relationship.repository";
import {RelationshipTransactionManager} from "./transaction/relationship.transaction.manager";
import {Relationship} from "../domain/relationship.entity";
import {Document} from "mongoose";

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('RelationshipRepository') private readonly relationshipRepository: RelationshipRepository,
    private readonly transactionManager: RelationshipTransactionManager
  ) {}

  findOne(from: string, to: string): Promise<Relationship> {
    return this.relationshipRepository.findByFromAndTo(from, to);
  }

  async sentFriendRequest(from: string, to: string): Promise<void> {
    const sender = await this.getExitingRelationshipByFromAndTo(from, to);
    const receiver = await this.getExitingRelationshipByFromAndTo(from, to);
    sender.sendFriendRequest(receiver);

    return await this.transactionManager.transaction(async session => {
      await sender.save({ session });
      await receiver.save({ session });
    });
  }

  async acceptFriendRequest(from: string, to: string): Promise<void> {
    const receiver = await this.getExitingRelationshipByFromAndTo(from, to);
    const sender = await this.getExitingRelationshipByFromAndTo(from, to);
    receiver.acceptFriendRequest(sender);

    return await this.transactionManager.transaction(async session => {
      await receiver.save({ session });
      await sender.save({ session });
    });
  }

  async unfriend(from: string, to: string): Promise<void> {
    const receiver = await this.getExitingRelationshipByFromAndTo(from, to);
    const sender = await this.getExitingRelationshipByFromAndTo(from, to);
    receiver.unfriend(sender);

    return await this.transactionManager.transaction(async session => {
      await receiver.save({ session });
      await sender.save({ session });
    });
  }

  private async getExitingRelationshipByFromAndTo(from, to): Promise<(Relationship & Document)> {
    const relationship = await this.relationshipRepository.findByFromAndTo(from, to);

    if (!relationship) {
      throw new NotFoundException();
    }

    return relationship;
  }
}
