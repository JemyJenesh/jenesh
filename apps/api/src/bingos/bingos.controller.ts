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
import { PlayersService } from 'src/players/players.service';
import { BingosService } from './bingos.service';
import { CreateBingoDto } from './dto/create-bingo.dto';
import { UpdateBingoDto } from './dto/update-bingo.dto';

@Controller('bingos')
export class BingosController {
  constructor(
    private readonly bingosService: BingosService,
    private readonly playersService: PlayersService,
  ) {}

  @Post()
  create(@Body() createBingoDto: CreateBingoDto) {
    const host = this.playersService.findOne(createBingoDto.host);
    if (!host) {
      throw new NotFoundException({
        message: 'Host not found',
      });
    }
    return this.bingosService.create(createBingoDto);
  }

  @Get()
  findAll() {
    return this.bingosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const bingo = this.bingosService.findOne(id);
    if (!bingo) {
      throw new NotFoundException({
        message: 'Bingo not found',
      });
    }
    return bingo;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBingoDto: UpdateBingoDto) {
    const bingo = this.bingosService.findOne(id);
    if (!bingo) {
      throw new NotFoundException({
        message: 'Bingo not found',
      });
    }
    const updatedBingo = { ...bingo, ...updateBingoDto };
    this.bingosService.update(updatedBingo);
    return updatedBingo;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const bingo = this.bingosService.findOne(id);
    if (!bingo) {
      throw new NotFoundException({
        message: 'Bingo not found',
      });
    }
    return this.bingosService.remove(id);
  }
}
