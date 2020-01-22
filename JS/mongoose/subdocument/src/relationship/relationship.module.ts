import {Module} from "@nestjs/common";
import {RelationshipMongoRepository} from "./infra/relationship.mongo.repository";
import {RelationshipTransactionManager} from "./app/transaction/relationship.transaction.manager";
import {FriendshipController} from "./ui/friendship.controller";
import {BlockRelationshipController} from "./ui/blockRelationshipController";
import {FriendshipService} from "./app/friendship.service";
import {BlockRelationshipService} from "./app/block-relationship.service";
import {MongodbModule} from "../mongodb.module";

@Module({
  imports: [MongodbModule],
  controllers: [
    FriendshipController,
    BlockRelationshipController
  ],
  providers: [
    FriendshipService,
    BlockRelationshipService,
    { provide: 'RelationshipRepository', useClass: RelationshipMongoRepository },
    RelationshipTransactionManager
  ]
})
export class RelationshipModule {}
