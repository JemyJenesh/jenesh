"use client";

import GameList from "@/app/games/components/game-list";
import PlayerIcon from "@/app/games/components/player-icon";
import { useGetOne } from "@/hooks/api";

export default function Page() {
  const {} = useGetOne({
    id: "me",
    path: "/api/players/me",
    queryKey: "me",
  });
  return (
    <div className="pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="col-span-full flex justify-between items-center">
        <h1 className="text-4xl">Games</h1>

        <PlayerIcon />
      </div>

      <GameList />
    </div>
  );
}
