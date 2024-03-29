import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Card } from './card.entity';

export class Hand implements InMemoryDBEntity {
  id: string;
  playerID: string;
  unoID: string;
  cards: Card[];
}
