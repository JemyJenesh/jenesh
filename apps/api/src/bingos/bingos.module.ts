import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { BoardsModule } from 'src/boards/boards.module';
import { PlayersModule } from 'src/players/players.module';
import { BingosController } from './bingos.controller';
import { BingosService } from './bingos.service';

@Module({
  imports: [InMemoryDBModule.forFeature('bingos'), PlayersModule, BoardsModule],
  controllers: [BingosController],
  providers: [BingosService],
})
export class BingosModule {}
