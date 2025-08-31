"use client";

import GameActions from "@/app/games/[id]/components/game-actions";
import PlayerList from "@/app/games/[id]/components/player-list";
import Loader from "@/components/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetOne } from "@/hooks/api";
import type { GameIdParam, GameResponse } from "@/schema/game";
import { InfoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<GameIdParam>();
  const router = useRouter();
  const { data, isPending, isError } = useGetOne<GameResponse>({
    id,
    path: `/api/games/${id}`,
    queryKey: "games",
  });

  useEffect(() => {
    console.log(data?.state);
    if (data?.state === "STARTED") {
      switch (data.type) {
        case "BINGO":
          router.push(`/games/${id}/bingo`);
        default:
          router.push(`/games/${id}/bingo`);
      }
    }
  }, [router, data, id]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <InfoIcon />
        <AlertTitle>Game not found!</AlertTitle>
        <AlertDescription>
          Couldn't find the game you're looking for.
        </AlertDescription>
      </Alert>
    );
  }

  const { hostId, players } = data;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl text-center">Waiting for players...</p>
      <PlayerList gameId={id} hostId={hostId} players={players} />
      <GameActions id={id} hostId={hostId} players={players} />
    </div>
  );
}
