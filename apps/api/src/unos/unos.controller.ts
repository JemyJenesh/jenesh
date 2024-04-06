import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { CreateUnoDto } from './dto/create-uno.dto';
import { HandsService } from './hands.service';
import { UnosService } from './unos.service';

@Controller('unos')
export class UnosController {
  constructor(
    private readonly unosService: UnosService,
    private readonly playersService: PlayersService,
    private readonly handsService: HandsService,
  ) {}

  @Post()
  create(@Body() createUnoDto: CreateUnoDto) {
    return this.unosService.create(createUnoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const uno = this.unosService.findOne(id);
    if (!uno) {
      throw new NotFoundException({
        message: 'Uno not found',
      });
    }
    const players = this.playersService.findMany(uno.playerIDs);
    return { uno, players };
  }

  @Get(':id/hands')
  findOneWithHands(@Param('id') id: string) {
    const uno = this.unosService.findOne(id);
    if (!uno) {
      throw new NotFoundException({
        message: 'Uno not found',
      });
    }
    const players = this.playersService.findMany(uno.playerIDs);
    const hands = this.handsService.findByUnoID(uno.id, uno.playerIDs);
    const playersWithHands = players.map((player) => ({
      ...player,
      hand: hands.find((hand) => hand.playerID === player.id),
    }));
    return { uno, players: playersWithHands };
  }
}
