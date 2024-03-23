import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [InMemoryDBModule.forFeature('players')],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
