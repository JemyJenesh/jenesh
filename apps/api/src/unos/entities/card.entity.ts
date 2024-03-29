import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class Card implements InMemoryDBEntity {
  id: string;
  type: 'number' | 'action' | 'wild';
  color: 'red' | 'yellow' | 'blue' | 'green' | 'wild';
  value:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'draw-two'
    | 'skip'
    | 'reverse'
    | 'wild'
    | 'draw-four';
}
