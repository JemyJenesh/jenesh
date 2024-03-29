import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { PlayersModule } from 'src/players/players.module';
import { CardsService } from './cards.service';
import { HandsService } from './hands.service';
import { UnosController } from './unos.controller';
import { UnosGetaway } from './unos.gateway';
import { UnosService } from './unos.service';

@Module({
  imports: [InMemoryDBModule.forRoot({}), PlayersModule],
  controllers: [UnosController],
  providers: [UnosService, UnosGetaway, CardsService, HandsService],
})
export class UnosModule {}
