import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayersService } from 'src/players/players.service';
import { CardsService } from './cards.service';
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

    // let history = bingo.history;

    // this.intervalIDs[bingoID] = setInterval(() => {
    //   let updatedBingo = this.bingosService.findOne(bingo.id);
    //   if (history.length < 75) {
    //     const newNumber = this.boardsService._pickBingoNumber(history);
    //     history = [...history, newNumber];
    //     this.bingosService.update({ ...updatedBingo, history });
    //     client.nsp.to(data.bingoID).emit('new-bingo-number', newNumber);
    //   } else {
    //     this.bingosService.update({ ...updatedBingo, state: 'over' });
    //     clearInterval(this.intervalIDs[bingoID]);
    //     client.nsp.to(bingoID).emit('bingo-over');
    //   }
    // }, 5000);
  }

  // @SubscribeMessage('update-board')
  // handleUpdateBoard(client: Socket, data: { board: Board }) {
  //   const { board } = data;
  //   this.boardsService.update(board);
  //   const bingo = this.bingosService.findOne(board.bingoID);
  //   const isBingo = this.boardsService._checkForBingo(board);
  //   if (isBingo && !bingo.winnerID) {
  //     clearInterval(this.intervalIDs[board.bingoID]);
  //     this.bingosService.update({
  //       ...bingo,
  //       state: 'over',
  //       winnerID: board.playerID,
  //     });
  //     client.nsp.to(board.bingoID).emit('bingo', {
  //       board,
  //     });
  //   }
  // }
}
