import { Module } from '@nestjs/common';
import { BoardService } from './board.service';

@Module({
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
