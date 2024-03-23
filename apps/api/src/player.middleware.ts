import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PlayersService } from './players/players.service';

@Injectable()
export class PlayerMiddleware implements NestMiddleware {
  constructor(private readonly playersService: PlayersService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (authorization) {
      const player = JSON.parse(authorization);
      const existingPlayer = this.playersService.findOne(player.id);
      if (!existingPlayer) {
        this.playersService.create(player);
      }
    }
    next();
  }
}
