"use client";

import BingoContextProvider from "@/app/games/[id]/bingo/components/bingo-context-provider";
import BingoHistory from "@/app/games/[id]/bingo/components/bingo-history";
import Board from "@/app/games/[id]/bingo/components/board";
import { usePlayer } from "@/app/games/components/player-provider";
import Loader from "@/components/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetOne } from "@/hooks/api";
import type { BingoResponse } from "@/schema/bingo";
import type { GameIdParam } from "@/schema/game";
import { InfoIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<GameIdParam>();
  const { player } = usePlayer();

  const { data, isPending, isError } = useGetOne<BingoResponse>({
    id,
    path: `/api/bingos?gameId=${id}&playerId=${player?.id}`,
    queryKey: "bingo",
    enabled: !!player,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <InfoIcon />
        <AlertTitle>Bingo not found!</AlertTitle>
        <AlertDescription>
          Couldn't find the game you're looking for.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data) return null;

  return (
    <BingoContextProvider bingo={data}>
      <BingoHistory />
      <Board board={data.board} />
    </BingoContextProvider>
  );
}
