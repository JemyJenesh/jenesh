import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BingosModule } from './bingos/bingos.module';
import { BoardsModule } from './boards/boards.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [PlayersModule, BingosModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
