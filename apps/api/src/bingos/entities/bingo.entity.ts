import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Bingo implements InMemoryDBEntity {
  id: string;
  hostID: string;
  history: string[];
  playerIDs: string[];
  winnerID?: string;
  state: 'waiting' | 'started' | 'over';
}
