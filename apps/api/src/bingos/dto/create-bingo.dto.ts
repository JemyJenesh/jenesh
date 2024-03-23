import { IsNotEmpty } from 'class-validator';

export class CreateBingoDto {
  @IsNotEmpty()
  hostID: string;
}
