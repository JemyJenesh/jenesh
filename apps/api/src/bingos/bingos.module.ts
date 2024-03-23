import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { PlayersModule } from 'src/players/players.module';
import { BingosController } from './bingos.controller';
import { BingosService } from './bingos.service';

@Module({
  imports: [InMemoryDBModule.forFeature('bingos'), PlayersModule],
  controllers: [BingosController],
  providers: [BingosService],
})
export class BingosModule {}
