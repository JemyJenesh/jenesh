import { IsEnum, IsOptional } from 'class-validator';

export class UpdateBingoDto {
  history?: string[];
  players?: string[];
  winner?: string;

  @IsOptional()
  @IsEnum(['waiting', 'started', 'over'], {
    message:
      'state must be one of the following values: waiting | started | over',
  })
  state: 'waiting' | 'started' | 'over';
}
