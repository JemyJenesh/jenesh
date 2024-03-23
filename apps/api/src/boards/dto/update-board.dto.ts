import { IsNumber, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsNumber()
  spot: number;

  @IsString()
  playerID: string;
}
