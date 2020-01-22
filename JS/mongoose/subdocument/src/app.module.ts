import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {RelationshipModule} from "./relationship/relationship.module";
import {mongoose} from "@typegoose/typegoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:8101/relationship'),
    RelationshipModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

mongoose.set('debug', true);
