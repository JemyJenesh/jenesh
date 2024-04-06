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

  findOne(id: string) {
    return this.hands.get(id);
  }

  findByUnoID(unoID: string, playerIDs: string[]) {
    return this.hands.query(
      (hand) => hand.unoID === unoID && playerIDs.includes(hand.playerID),
    );
  }

  updateHandEffect(id: string, effect?: string) {
    const hand = this.findOne(id);
    const updatedHand = {
      ...hand,
      effect,
    };
    this.hands.update(updatedHand);
    return updatedHand;
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
    const removedCard = hand.cards.find((card) => card.id === cardID);
    const updatedHand = {
      ...hand,
      cards: hand.cards.filter((card) => card.id !== cardID),
    };
    this.hands.update(updatedHand);
    return { hand: updatedHand, removedCard };
  }
}
