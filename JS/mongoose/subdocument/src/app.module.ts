import { Module } from '@nestjs/common';
import {RelationshipModule} from "./relationship/relationship.module";
import {mongoose} from "@typegoose/typegoose";

@Module({
  imports: [
    RelationshipModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

mongoose.set('debug', true);
