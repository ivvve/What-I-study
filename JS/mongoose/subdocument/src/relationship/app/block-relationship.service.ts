import {Inject, Injectable, NotFoundException} from "@nestjs/common";
import {RelationshipRepository} from "../domain/relationship.repository";
import {RelationshipTransactionManager} from "./transaction/relationship.transaction.manager";
import {Relationship} from "../domain/relationship.entity";
import {Document} from "mongoose";

@Injectable()
export class BlockRelationshipService {
  constructor(
    @Inject('RelationshipRepository') private readonly relationshipRepository: RelationshipRepository,
    private readonly transactionManager: RelationshipTransactionManager
  ) {}

  async block(from: string, to: string): Promise<void> {
    const blockingRelationship = await this.relationshipRepository.findByFromAndTo(from, to);
    const blockedRelationship = await this.relationshipRepository.findByFromAndTo(from, to);

    await this.transactionManager.transaction(async session => {

      if (!blockedRelationship || !blockedRelationship) {
        const blockingRelationship = new Relationship(from, to);
        const blockedRelationship = new Relationship(to, from);
        blockingRelationship.block(blockedRelationship);

        await this.relationshipRepository.saveAll([blockingRelationship, blockedRelationship], session);
        return;
      }

      blockingRelationship.block(blockedRelationship);
      await blockingRelationship.save({ session });
      await blockedRelationship.save({ session });
    });
  }

  async unblock(from: string, to: string) {
    const fromB = await this.getExitingRelationshipByFromAndTo(from, to);
    const toB = await this.getExitingRelationshipByFromAndTo(from, to);
    fromB.unblock(toB);

    await this.transactionManager.transaction(async session => {
      await fromB.save({ session });
      await toB.save({ session });
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
