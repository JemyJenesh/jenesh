import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private inMemoryDB: InMemoryDBService<Player>) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.inMemoryDB.create(createPlayerDto);
  }

  findAll() {
    return this.inMemoryDB.getAll();
  }

  findOne(id: string) {
    return this.inMemoryDB.get(id);
  }

  findMany(ids: string[]) {
    return this.inMemoryDB.getMany(ids);
  }

  update(player: Player) {
    return this.inMemoryDB.update(player);
  }

  remove(id: string) {
    return this.inMemoryDB.delete(id);
  }
}
