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
import { UnosService } from './unos.service';

@Controller('unos')
export class UnosController {
  constructor(
    private readonly unosService: UnosService,
    private readonly playersService: PlayersService,
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
}
