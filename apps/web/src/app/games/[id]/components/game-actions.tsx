"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { axiosInstance } from "@/lib/axios";
import type { GameIdParam, GameJoinInput } from "@/schema/game";
import type { Player } from "@/schema/player";
import { useMutation } from "@tanstack/react-query";
import { GamepadIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id: string;
  hostId: string;
  players: Player[];
};

function useGameJoin() {
  return useMutation({
    mutationFn: (data: GameJoinInput) => {
      return axiosInstance.post("/api/games/join", data);
    },
  });
}

function useGameStart() {
  return useMutation({
    mutationFn: (data: GameIdParam) => {
      return axiosInstance.post("/api/games/start", data);
    },
  });
}

export default function GameActions({ id, hostId, players }: Props) {
  const router = useRouter();
  const { player } = usePlayer();
  const isHost = !!(hostId == player?.id);
  const isParticipant = !!players.find((p) => p.id === player?.id);

  const { mutate: joinGame, isPending: isJoining } = useGameJoin();
  const { mutate: startGame, isPending: isStarting } = useGameStart();

  const buttonJoinLabel = isJoining
    ? "Joining"
    : isParticipant
    ? "Joined"
    : "Join";
  const buttonStartLabel = isStarting ? "Starting" : "Start";

  const handleCopyClick = useDebounce(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link to clipboard");
    }
  }, 500);

  const onJoin = () => {
    if (!player) return;

    joinGame({ gameId: id, playerId: player.id });
  };

  const onStart = async () => {
    if (player?.id !== hostId) return;

    startGame({ id });

    router.push(`/games/${id}/bingo`);
  };

  // useEffect(() => {
  //   const channel = pusherClient.subscribe(`game-${id}`);

  //   channel.bind("game-started", ({ data }: { data: Game }) => {
  //     if (data.type === "BINGO") {
  //       router.push(`/games/${data.id}/bingo`);
  //     }
  //   });
  // }, [id, router]);

  return (
    <>
      {isHost && (
        <Alert variant="default" className="w-full max-w-md mx-auto">
          <GamepadIcon />
          <AlertTitle>You are the host.</AlertTitle>
          <AlertDescription>
            You can start the game when everyone has joined.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={handleCopyClick}>
          Share link
        </Button>

        {isHost ? (
          <Button onClick={onStart} disabled={isStarting}>
            {buttonStartLabel}
          </Button>
        ) : (
          <Button disabled={isParticipant || isJoining} onClick={onJoin}>
            {isJoining && <Loader2Icon className="animate-spin" />}
            {buttonJoinLabel}
          </Button>
        )}
      </div>
    </>
  );
}
