import {ClientSession, Document} from "mongoose";
import {Relationship} from "./relationship.entity";

export interface RelationshipRepository {
  findByFromAndTo(from: string, to: string): Promise<(Relationship & Document) | null>

  saveAll(relationships: Relationship[], session?: ClientSession): Promise<(Relationship & Document)[]>;
}
