import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { CreateBingoDto } from './dto/create-bingo.dto';
import { Bingo } from './entities/bingo.entity';

@Injectable()
export class BingosService {
  constructor(private inMemoryDB: InMemoryDBService<Bingo>) {}

  create(bingo: CreateBingoDto) {
    const newBingo = {
      ...bingo,
      history: [],
      players: [bingo.host],
      state: 'waiting' as const,
    };
    return this.inMemoryDB.create(newBingo);
  }

  findAll() {
    return this.inMemoryDB.getAll();
  }

  findOne(id: string) {
    return this.inMemoryDB.get(id);
  }

  update(bingo: Bingo) {
    return this.inMemoryDB.update(bingo);
  }

  remove(id: string) {
    return this.inMemoryDB.delete(id);
  }
}
