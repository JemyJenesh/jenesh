import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
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

  findPlayersBoard(bingoID: string, playerID: string) {
    return this.inMemoryDB.query(
      (board) => board.playerID === playerID && board.bingoID === bingoID,
    )[0];
  }

  update(updateBoardDto: Board) {
    const board = this.findOne(updateBoardDto.id);
    if (!board) {
      throw new NotFoundException({
        message: 'Board not found',
      });
    }
    this.inMemoryDB.update(updateBoardDto);
    return updateBoardDto;
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

  _pickBingoNumber(exclude: string[] = []) {
    const nums = [
      'b1',
      'b2',
      'b3',
      'b4',
      'b5',
      'b6',
      'b7',
      'b8',
      'b9',
      'b10',
      'b11',
      'b12',
      'b13',
      'b14',
      'b15',
      'i16',
      'i17',
      'i18',
      'i19',
      'i20',
      'i21',
      'i22',
      'i23',
      'i24',
      'i25',
      'i26',
      'i27',
      'i28',
      'i29',
      'i30',
      'n31',
      'n32',
      'n33',
      'n34',
      'n35',
      'n36',
      'n37',
      'n38',
      'n39',
      'n40',
      'n41',
      'n42',
      'n43',
      'n44',
      'n45',
      'g46',
      'g47',
      'g48',
      'g49',
      'g50',
      'g51',
      'g52',
      'g53',
      'g54',
      'g55',
      'g56',
      'g57',
      'g58',
      'g59',
      'g60',
      'o61',
      'o62',
      'o63',
      'o64',
      'o65',
      'o66',
      'o67',
      'o68',
      'o69',
      'o70',
      'o71',
      'o72',
      'o73',
      'o74',
      'o75',
    ];
    const newNums = nums.filter((item) => !exclude.includes(item));

    return newNums[Math.floor(Math.random() * newNums.length)];
  }

  _checkForBingo(board: Board): boolean {
    const { spots } = board;

    let winningCases = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    for (const cases of winningCases) {
      const isAllMarked = cases.every((index) => spots[index].marked);

      if (isAllMarked) {
        return true;
      }
    }

    return false;
  }
}
