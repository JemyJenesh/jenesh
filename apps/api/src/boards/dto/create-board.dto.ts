import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  playerID: string;

  @IsNotEmpty()
  bingoID: string;
}
