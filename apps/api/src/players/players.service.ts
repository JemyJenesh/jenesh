import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private inMemoryDB: InMemoryDBService<Player>) {}

  create(createPlayerDto: CreatePlayerDto) {
    const player = this.inMemoryDB.create(createPlayerDto);
    return player;
  }

  findAll() {
    return this.inMemoryDB.getAll();
  }

  findOne(id: string) {
    return this.inMemoryDB.get(id);
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.inMemoryDB.update({
      id,
      ...updatePlayerDto,
    });
  }

  remove(id: string) {
    return this.inMemoryDB.delete(id);
  }
}
