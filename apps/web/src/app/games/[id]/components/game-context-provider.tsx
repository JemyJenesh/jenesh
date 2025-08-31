"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import { socket } from "@/lib/socket";
import { gameConnect } from "@/lib/socket/game";
import type { Game, GameResponse } from "@/schema/game";
import type { Player } from "@/schema/player";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type Props = {
  game: GameResponse | null;
};

type GameContext = {
  game: Game | null;
  players: Player[];
};

const gameContext = createContext<GameContext>({
  players: [],
  game: null,
});

export const useGame = () => {
  return useContext(gameContext);
};

export default function GameContextProvider(props: PropsWithChildren<Props>) {
  const router = useRouter();
  const { player } = usePlayer();
  const [players, setPlayers] = useState<Player[]>(props.game?.players || []);
  const [game, setGame] = useState<Props["game"]>(props.game);

  useEffect(() => {
    if (game && player) {
      if (socket.connected) {
        gameConnect({ gameId: game.id, playerId: player.id });
      }

      socket.on("game:joined", (data: Player) => {
        setPlayers((prev) => [...prev, data]);
      });

      socket.on("game:started", () => {
        router.push(`/games/${game.id}/bingo`);
      });
    }

    return () => {
      socket.off("connect");
      socket.off("game:started");
      socket.off("game:joined");
    };
  }, [game, player]);

  return (
    <gameContext.Provider value={{ players, game }}>
      {props.children}
    </gameContext.Provider>
  );
}
