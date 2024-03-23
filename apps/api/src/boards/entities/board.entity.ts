import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Board implements InMemoryDBEntity {
  id: string;
  spots: {
    value: string;
    marked: boolean;
  }[];
  playerID: string;
  bingoID: string;
}
