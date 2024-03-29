import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Card } from './card.entity';

export class Uno implements InMemoryDBEntity {
  id: string;
  drawPile: Card[];
  discardPile: Card[];
  turn: number;
  direction: -1 | 1;
  state: 'waiting' | 'serving' | 'started' | 'over';
  playerIDs: string[];
  winnerID?: string;
}
