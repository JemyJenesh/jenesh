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

  update(uno: Uno) {
    this.unos.update(uno);
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
    const discardPile = deck.pop();
    let drawnCard: Card[];
    for (const playerID of uno.playerIDs) {
      ({ deck, drawnCard } = this.cardsService.draw(deck, 7));
      this.handsService.create(playerID, id, drawnCard);
    }
    this.unos.update({
      ...uno,
      state: 'started',
      drawPile: deck,
      discardPile: [discardPile],
    });
  }

  drawCards(id: string, handID: string, count: number = 1) {
    const uno = this.findOne(id);
    const deck = uno.drawPile.slice(0, -count);
    const cards = uno.drawPile.slice(-count).reverse();
    const hand = this.handsService.addCards(handID, cards);
    const updatedUno: Uno = {
      ...uno,
      drawPile: deck,
    };

    return { hand, uno: updatedUno };
  }

  nextTurn(uno: Uno, direction: number) {
    const { turn, playerIDs } = uno;
    const playersLength = playerIDs.length;
    return (turn + direction + playersLength) % playersLength;
  }

  getPlayerIDByTurn(uno: Uno, turn: number) {
    const { playerIDs } = uno;
    return playerIDs[turn];
  }
}
