import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Player implements InMemoryDBEntity {
  id: string;
  name?: string;
  avatar?: string;
}
