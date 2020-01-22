import {Logger, Module, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {RelationshipSchema} from "./relationship/domain/relationship.entity";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:8101/relationship', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    MongooseModule.forFeature([
      { name: 'relationships', collection: 'relationships', schema: RelationshipSchema }
    ])
  ],
  exports: [
    MongooseModule
  ]
})
export class MongodbModule implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger('MongodbModule');

  onModuleInit(): any {
    this.logger.log('Mongodb Module initialized....');
  }

  onModuleDestroy(): any {
    this.logger.log('Mongodb Module destroyed....');
  }
}
