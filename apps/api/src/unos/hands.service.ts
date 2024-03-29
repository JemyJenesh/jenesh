import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Card } from './entities/card.entity';
import { Hand } from './entities/hand.entity';

@Injectable()
export class HandsService {
  constructor(private hands: InMemoryDBService<Hand>) {}

  create(playerID: string, unoID: string, cards: Card[]) {
    return this.hands.create({
      playerID,
      unoID,
      cards,
    });
  }

  addCards(id: string, cards: Card[]) {
    const hand = this.hands.get(id);
    const updatedHand = {
      ...hand,
      cards: [...hand.cards, ...cards],
    };
    this.hands.update(updatedHand);
    return updatedHand;
  }

  removeCard(id: string, cardID: string) {
    const hand = this.hands.get(id);
    const updatedHand = {
      ...hand,
      cards: hand.cards.filter((card) => card.id !== cardID),
    };
    this.hands.update(updatedHand);
    return updatedHand;
  }
}
