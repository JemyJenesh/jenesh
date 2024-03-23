import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const player = this.playersService.findOne(id);
    if (!player) {
      throw new NotFoundException({
        message: 'Player not found',
      });
    }
    return player;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    const player = this.playersService.findOne(id);
    if (!player) {
      throw new NotFoundException({
        message: 'Player not found',
      });
    }
    const newPlayer = { ...player, ...updatePlayerDto };
    this.playersService.update(id, newPlayer);
    return newPlayer;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const player = this.playersService.findOne(id);
    if (!player) {
      throw new NotFoundException({
        message: 'Player not found',
      });
    }
    return this.playersService.remove(id);
  }
}
