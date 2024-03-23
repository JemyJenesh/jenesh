import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BingosModule } from './bingos/bingos.module';
import { BoardsModule } from './boards/boards.module';
import { PlayerMiddleware } from './player.middleware';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'app', 'dist'),
    }),
    PlayersModule,
    BingosModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PlayerMiddleware).forRoutes('*');
  }
}
