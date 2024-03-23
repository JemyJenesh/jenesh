import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Module({
  imports: [InMemoryDBModule.forFeature('boards')],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
