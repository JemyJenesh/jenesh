import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayersService } from 'src/players/players.service';
import { BingosService } from './bingos.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BingosGetaway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly bingosService: BingosService,
    private readonly playersService: PlayersService,
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
  }
}
