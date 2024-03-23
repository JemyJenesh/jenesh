import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(private inMemoryDB: InMemoryDBService<Board>) {}

  create(createBoardDto: CreateBoardDto) {
    const spots = this._generateSpots();
    const board = {
      spots,
      ...createBoardDto,
    };
    return this.inMemoryDB.create(board);
  }

  findAll() {
    return this.inMemoryDB.getAll();
  }

  findOne(id: string) {
    return this.inMemoryDB.get(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = this.findOne(id);
    if (!board) {
      throw new NotFoundException({
        message: 'Board not found',
      });
    }
    if (board.playerID !== updateBoardDto.playerID) {
      throw new BadRequestException({
        message: 'Player has no access to the board',
      });
    }
    const newSpots = board.spots.map((spot, i) =>
      i === updateBoardDto.spot ? { ...spot, marked: true } : spot,
    );
    const updatedBoard: Board = {
      ...board,
      spots: newSpots,
    };
    this.inMemoryDB.update(updatedBoard);
    return updatedBoard;
  }

  remove(id: string) {
    return this.inMemoryDB.delete(id);
  }

  // utility
  _generateWholeNumbersInRange(a: number, b: number) {
    if (a > b) {
      throw new Error("Invalid range: 'a' should be less than or equal to 'b'");
    }

    const result = [];
    for (let i = a; i <= b; i++) {
      result.push(i);
    }

    return result;
  }

  _generateBoard(free: boolean = true) {
    let ranges: [start: number, end: number, letter: string][] = [
      [1, 15, 'b'],
      [16, 30, 'i'],
      [31, 45, 'n'],
      [46, 60, 'g'],
      [61, 75, 'o'],
    ];

    let cells: string[] = [];
    for (const range of ranges) {
      const [start, end, alphabet] = range;
      let nums = this._generateWholeNumbersInRange(start, end).map(
        (a) => alphabet + a,
      );
      const shuffled = nums.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 5);

      cells = [...cells, ...selected];
    }

    if (free) {
      cells[12] = 'free';
    }

    return cells;
  }

  _generateSpots() {
    const cells = this._generateBoard();
    const spots: { value: string; marked: boolean }[] = [];

    for (const cell of cells) {
      spots.push({
        value: cell,
        marked: cell === 'free' ? true : false,
      });
    }

    return spots;
  }
}
