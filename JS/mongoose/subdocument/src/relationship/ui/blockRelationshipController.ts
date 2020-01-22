import {Controller, Post} from "@nestjs/common";
import {BlockRelationshipService} from "../app/block-relationship.service";

@Controller('block')
export class BlockRelationshipController {
  constructor(
    private readonly blockRelationshipService: BlockRelationshipService
  ) {}

  @Post('block')
  block() {
    const from = 'u1';
    const to = 'u2';
    this.blockRelationshipService.block(from, to);
  }

  @Post('unblock')
  unblock() {
    const from = 'u1';
    const to = 'u2';
    this.blockRelationshipService.unblock(from, to);
  }
}
