import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateUnoDto } from './dto/create-uno.dto';
import { Card } from './entities/card.entity';
import { Uno } from './entities/uno.entity';
import { HandsService } from './hands.service';

@Injectable()
export class UnosService {
  constructor(
    private unos: InMemoryDBService<Uno>,
    private handsService: HandsService,
    private cardsService: CardsService,
  ) {}

  create(createUnoDto: CreateUnoDto) {
    const { hostID } = createUnoDto;

    return this.unos.create({
      drawPile: this.cardsService.shuffleDeck(this.cardsService.buildDeck()),
      discardPile: [],
      turn: 0,
      direction: 1,
      state: 'waiting',
      playerIDs: [hostID],
    });
  }

  findOne(id: string) {
    return this.unos.get(id);
  }

  addPlayer(id: string, playerID: string) {
    const uno = this.findOne(id);
    const updatedUno: Uno = {
      ...uno,
      playerIDs: [...uno.playerIDs, playerID],
    };
    this.unos.update(updatedUno);
  }

  start(id: string) {
    const uno = this.findOne(id);
    let deck = uno.drawPile;
    let drawnCard: Card[];
    for (const playerID of uno.playerIDs) {
      ({ deck, drawnCard } = this.cardsService.draw(deck, 7));
      this.handsService.create(playerID, id, drawnCard);
    }
    const discardPile = deck.pop();
    this.unos.update({
      ...uno,
      state: 'started',
      drawPile: deck,
      discardPile: [discardPile],
    });
  }
}
