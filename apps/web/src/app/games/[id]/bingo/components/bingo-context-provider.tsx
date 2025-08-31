"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import { socket } from "@/lib/socket";
import { gameConnect } from "@/lib/socket/game";
import type { Bingo, BingoResponse } from "@/schema/bingo";
import type { Board } from "@/schema/board";
import type { Game } from "@/schema/game";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type Props = {
  bingo: BingoResponse;
};

type BingoContext = {
  bingo: Bingo | null;
  board: Board | null;
  game: Game | null;
};

const bingoContext = createContext<BingoContext>({
  bingo: null,
  board: null,
  game: null,
});

export const useBingo = () => {
  return useContext(bingoContext);
};

export default function BingoContextProvider(props: PropsWithChildren<Props>) {
  const { player } = usePlayer();
  const { board: propBoard, game: propGame, ...rest } = props.bingo;
  const [bingo, setBingo] = useState(rest);
  const [board, setBoard] = useState(propBoard);
  const [game, setGame] = useState(propGame);

  useEffect(() => {
    if (game && player) {
      if (socket.connected) {
        gameConnect({ gameId: game.id, playerId: player.id });
      }

      socket.on("bingo:number", (data) => {
        setBingo((prev) => ({
          ...prev,
          history: [...prev.history, data],
        }));
      });
    }

    return () => {
      socket.off("game:connect");
      socket.off("bingo:number");
    };
  }, [game, player]);

  return (
    <bingoContext.Provider value={{ bingo, board, game }}>
      {props.children}
    </bingoContext.Provider>
  );
}
