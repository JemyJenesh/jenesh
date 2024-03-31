import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayersService } from 'src/players/players.service';
import { CardsService } from './cards.service';
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
    const nextTurn = this.unosService.nextTurn(uno);
    const updatedUno: Uno = {
      ...uno,
      turn: nextTurn,
    };
    this.unosService.update(updatedUno);
    client.nsp.to(unoID).emit('card-drawn', { uno: updatedUno, hand });
  }
}
