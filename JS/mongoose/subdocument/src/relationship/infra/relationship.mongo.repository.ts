import {RelationshipRepository} from "../domain/relationship.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Relationship} from "../domain/relationship.entity";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {ClientSession, Document} from "mongoose";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RelationshipMongoRepository implements RelationshipRepository {
  constructor(
    @InjectModel('relationships') private readonly Relationship: ModelType<Relationship>
  ) {}

  findByFromAndTo(from: string, to: string): Promise<(Relationship & Document) | null> {
    return this.Relationship.findOne({ from, to }).exec();
  }

  async saveAll(relationships: Relationship[], session?: ClientSession): Promise<(Relationship & Document)[]> {
    if (session) {
      const results: (Relationship & Document)[] = [];

      for (let relationship of relationships) {
        const result = await new this.Relationship(relationship).save({ session });
        results.push(result);
      }

      return results;
    }

    return Promise.all(relationships.map(relationship => {
      return new this.Relationship(relationship).save();
    }));
  }
}
