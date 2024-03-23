import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Bingo implements InMemoryDBEntity {
  id: string;
  host: string;
  history: string[];
  players: string[];
  winner?: string;
  state: 'waiting' | 'started' | 'over';
}
