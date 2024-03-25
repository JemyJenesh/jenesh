import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardsService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/board.entity';
import { PlayersService } from 'src/players/players.service';
import { BingosService } from './bingos.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BingosGetaway {
  intervalIDs: { [bingoID: string]: NodeJS.Timeout } = {};

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly bingosService: BingosService,
    private readonly playersService: PlayersService,
    private readonly boardsService: BoardsService,
  ) {}

  @SubscribeMessage('subscribe-bingo')
  handleSubscription(client: Socket, data: { bingoID: string }) {
    client.join(data.bingoID);
  }

  @SubscribeMessage('join-bingo')
  handleJoin(client: Socket, data: { playerID: string; bingoID: string }) {
    const { bingoID, playerID } = data;
    const bingo = this.bingosService.findOne(bingoID);
    const newBingo = {
      ...bingo,
      playerIDs: [...bingo.playerIDs, playerID],
    };
    this.boardsService.create({
      bingoID: bingo.id,
      playerID,
    });
    this.bingosService.update(newBingo);
    const player = this.playersService.findOne(playerID);
    client.nsp.to(data.bingoID).emit('player-joined', player);
  }

  @SubscribeMessage('start-bingo')
  handleStart(client: Socket, data: { bingoID: string }) {
    const { bingoID } = data;
    const bingo = this.bingosService.findOne(bingoID);
    const newBingo = {
      ...bingo,
      state: 'started' as const,
    };
    this.bingosService.update(newBingo);
    client.nsp.to(data.bingoID).emit('bingo-started');

    let history = bingo.history;

    this.intervalIDs[bingoID] = setInterval(() => {
      let updatedBingo = this.bingosService.findOne(bingo.id);
      if (history.length < 75) {
        const newNumber = this.boardsService._pickBingoNumber(history);
        history = [...history, newNumber];
        this.bingosService.update({ ...updatedBingo, history });
        client.nsp.to(data.bingoID).emit('new-bingo-number', newNumber);
      } else {
        this.bingosService.update({ ...updatedBingo, state: 'over' });
        clearInterval(this.intervalIDs[bingoID]);
        client.nsp.to(bingoID).emit('bingo-over');
      }
    }, 5000);
  }

  @SubscribeMessage('update-board')
  handleUpdateBoard(client: Socket, data: { board: Board }) {
    const { board } = data;
    this.boardsService.update(board);
    const bingo = this.bingosService.findOne(board.bingoID);
    const isBingo = this.boardsService._checkForBingo(board);
    if (isBingo && !bingo.winnerID) {
      clearInterval(this.intervalIDs[board.bingoID]);
      this.bingosService.update({
        ...bingo,
        state: 'over',
        winnerID: board.playerID,
      });
      client.nsp.to(board.bingoID).emit('bingo', {
        board,
      });
    }
  }
}
