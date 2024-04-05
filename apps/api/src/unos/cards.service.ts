import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Card } from './entities/card.entity';

export const UNO_COLORS = ['red', 'yellow', 'blue', 'green', 'wild'] as const;
export const UNO_VALUES = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'draw-two',
  'skip',
  'reverse',
  'wild',
  'draw-four',
] as const;
const UNO_TYPES = ['number', 'action', 'wild'] as const;
export type UnoColor = (typeof UNO_COLORS)[number];
export type UnoValue = (typeof UNO_VALUES)[number];
export type UnoType = (typeof UNO_TYPES)[number];

@Injectable()
export class CardsService {
  constructor(private cards: InMemoryDBService<Card>) {}

  create(color: UnoColor, value: UnoValue, type: UnoType): Card {
    return this.cards.create({
      color,
      value,
      type,
      selectedColor: color,
    });
  }

  changeWildCardColor(card: Card, color: UnoColor) {
    const updatedCard = {
      ...card,
      selectedColor: color,
    };
    this.cards.update(updatedCard);
    return updatedCard;
  }

  buildDeck() {
    let deck: Card[] = [];

    const actionCards: UnoValue[] = ['draw-two', 'skip', 'reverse'];
    for (const color of UNO_COLORS) {
      if (color === 'wild') continue;
      deck.push(this.create(color, UNO_VALUES[0], 'number'));
      for (let i = 1; i < 10; i++) {
        deck.push(this.create(color, UNO_VALUES[i], 'number'));
        deck.push(this.create(color, UNO_VALUES[i], 'number'));
      }
      for (let action of actionCards) {
        deck.push(this.create(color, action, 'action'));
        deck.push(this.create(color, action, 'action'));
      }
    }
    for (let i = 0; i < 4; i++) {
      deck.push(this.create('wild', 'wild', 'wild'));
      deck.push(this.create('wild', 'draw-four', 'wild'));
    }

    return deck;
  }

  shuffleDeck(deck: Card[]) {
    const shuffled = deck.sort(() => Math.random() - 0.5);
    const exclude: UnoValue[] = [
      'draw-two',
      'skip',
      'reverse',
      'draw-four',
      'wild',
    ];
    const lastCard = shuffled[shuffled.length - 1];
    if (exclude.includes(lastCard.value)) {
      this.shuffleDeck(shuffled);
    }
    return shuffled;
  }

  draw(deck: Card[], count: number = 1) {
    const drawnCard: Card[] = [];
    for (let i = 0; i < count; i++) {
      drawnCard.push(deck.pop());
    }
    return { deck, drawnCard };
  }
}
