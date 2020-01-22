import {Injectable} from "@nestjs/common";
import {ClientSession} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {Relationship} from "../../domain/relationship.entity";

@Injectable()
export class RelationshipTransactionManager {
  constructor(
    @InjectModel('relationships') private readonly Friendship: ModelType<Relationship>
  ) {}

  async transaction(transactionProcess: (session: ClientSession) => Promise<any>) {
    let result;
    const session = await this.getSession();

    try {
      session.startTransaction();

      result = await transactionProcess(session);

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }

    return result;
  }

  private getSession(): Promise<ClientSession> {
    return this.Friendship.db.startSession();
  }
}
