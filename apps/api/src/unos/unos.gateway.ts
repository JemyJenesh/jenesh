import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayersService } from 'src/players/players.service';
import { CardsService, UnoColor } from './cards.service';
import { Card } from './entities/card.entity';
import { Uno } from './entities/uno.entity';
import { HandsService } from './hands.service';
import { UnosService } from './unos.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UnosGetaway {
  intervalIDs: { [bingoID: string]: NodeJS.Timeout } = {};

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly unosService: UnosService,
    private readonly playersService: PlayersService,
    private readonly handsService: HandsService,
    private readonly cardsService: CardsService,
  ) {}

  @SubscribeMessage('subscribe-uno')
  handleSubscription(client: Socket, data: { unoID: string }) {
    client.join(data.unoID);
  }

  @SubscribeMessage('join-uno')
  handleJoin(client: Socket, data: { playerID: string; unoID: string }) {
    const { unoID, playerID } = data;
    const uno = this.unosService.findOne(unoID);
    this.unosService.addPlayer(uno.id, playerID);
    const player = this.playersService.findOne(playerID);
    client.nsp.to(data.unoID).emit('player-joined', player);
  }

  @SubscribeMessage('start-uno')
  handleStart(client: Socket, data: { unoID: string }) {
    const { unoID } = data;
    this.unosService.start(unoID);
    client.nsp.to(unoID).emit('uno-started');
  }

  @SubscribeMessage('draw')
  handleDraw(client: Socket, data: { handID: string; unoID: string }) {
    const { handID, unoID } = data;
    const { hand, uno } = this.unosService.drawCards(unoID, handID, 1);
    const nextTurn = this.unosService.nextTurn(uno, uno.direction);
    const updatedUno: Uno = {
      ...uno,
      turn: nextTurn,
    };
    this.unosService.update(updatedUno);
    client.nsp.to(unoID).emit('card-drawn', { uno: updatedUno, hand });
  }

  private _updateDiscardPile(uno: Uno, card: Card) {
    const updatedUno = {
      ...uno,
      discardPile: [...uno.discardPile, card],
    };
    this.unosService.update(updatedUno);
    return updatedUno;
  }

  private _reverse(uno: Uno) {
    let updatedUno = { ...uno };

    let newDirection = updatedUno.direction * -1;
    let nextTurn = this.unosService.nextTurn(updatedUno, newDirection);
    updatedUno.turn = nextTurn;
    updatedUno.direction = newDirection === 1 ? 1 : -1;

    return updatedUno;
  }

  private _skip(socket: Socket, uno: Uno) {
    let updatedUno = { ...uno };

    let nextTurn = this.unosService.nextTurn(updatedUno, updatedUno.direction);
    updatedUno.turn = nextTurn;

    const skippedPlayer = updatedUno.playerIDs[nextTurn];
    let skippedHand = this.handsService.findByUnoID(updatedUno.id, [
      skippedPlayer,
    ])[0];
    skippedHand = this.handsService.updateHandEffect(skippedHand.id, 'Skipped');

    nextTurn = this.unosService.nextTurn(updatedUno, updatedUno.direction);
    updatedUno.turn = nextTurn;

    socket.nsp.to(updatedUno.id).emit('hand-updated', { hand: skippedHand });

    let timeoutID = setTimeout(() => {
      const resetEffectHand = this.handsService.updateHandEffect(
        skippedHand.id,
      );
      socket.nsp
        .to(updatedUno.id)
        .emit('hand-updated', { hand: resetEffectHand });

      clearTimeout(timeoutID);
    }, 2000);

    return updatedUno;
  }

  private _drawCards(socket: Socket, uno: Uno, count: number) {
    let updatedUno = { ...uno };

    let nextTurn = this.unosService.nextTurn(updatedUno, updatedUno.direction);
    updatedUno.turn = nextTurn;
    this.unosService.update(updatedUno);

    const skippedPlayer = updatedUno.playerIDs[nextTurn];
    let skippedHand = this.handsService.findByUnoID(updatedUno.id, [
      skippedPlayer,
    ])[0];
    skippedHand = this.handsService.updateHandEffect(
      skippedHand.id,
      `${count} Cards Added`,
    );
    const drawCardResponse = this.unosService.drawCards(
      updatedUno.id,
      skippedHand.id,
      count,
    );
    updatedUno = drawCardResponse.uno;
    skippedHand = drawCardResponse.hand;

    nextTurn = this.unosService.nextTurn(updatedUno, updatedUno.direction);
    updatedUno.turn = nextTurn;

    socket.nsp.to(updatedUno.id).emit('hand-updated', { hand: skippedHand });

    let timeoutID = setTimeout(() => {
      const resetEffectHand = this.handsService.updateHandEffect(
        skippedHand.id,
      );
      socket.nsp
        .to(updatedUno.id)
        .emit('hand-updated', { hand: resetEffectHand });

      clearTimeout(timeoutID);
    }, 2000);

    return updatedUno;
  }

  @SubscribeMessage('discard')
  handleDiscard(
    client: Socket,
    data: {
      handID: string;
      unoID: string;
      cardID: string;
      chosenColor?: UnoColor;
    },
  ) {
    const { handID, unoID, cardID, chosenColor } = data;
    let { hand, removedCard } = this.handsService.removeCard(handID, cardID);
    let uno = this.unosService.findOne(unoID);
    let updatedUno = uno;
    if (removedCard.type === 'wild' && chosenColor) {
      removedCard = this.cardsService.changeWildCardColor(
        removedCard,
        chosenColor,
      );
    }

    if (removedCard.value === 'skip') {
      updatedUno = this._skip(client, uno);
      updatedUno = this._updateDiscardPile(updatedUno, removedCard);
    } else if (removedCard.value === 'reverse') {
      updatedUno = this._reverse(uno);
      updatedUno = this._updateDiscardPile(updatedUno, removedCard);
    } else if (removedCard.value === 'draw-two') {
      updatedUno = this._drawCards(client, uno, 2);
      updatedUno = this._updateDiscardPile(updatedUno, removedCard);
    } else if (removedCard.value === 'draw-four') {
      updatedUno = this._drawCards(client, uno, 4);
      updatedUno = this._updateDiscardPile(updatedUno, removedCard);
    } else {
      let nextTurn = this.unosService.nextTurn(
        updatedUno,
        updatedUno.direction,
      );
      updatedUno.turn = nextTurn;
      updatedUno = this._updateDiscardPile(updatedUno, removedCard);
    }
    client.nsp.to(unoID).emit('card-thrown', { uno: updatedUno, hand });
  }
}
