"use client";

import { useGame } from "@/app/games/[id]/components/game-context-provider";
import PlayerInfo from "@/app/games/[id]/components/player-info";

export default function PlayerList() {
  const { players, game } = useGame();

  if (!game) return null;

  return (
    <div className="w-full flex justify-center gap-4 overflow-x-auto">
      {players.map((player) => (
        <PlayerInfo key={player.id} hostId={game.hostId} player={player} />
      ))}
    </div>
  );
}
