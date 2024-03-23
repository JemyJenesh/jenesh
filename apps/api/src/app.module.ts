import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { BingosModule } from './bingos/bingos.module';

@Module({
  imports: [PlayersModule, BingosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
