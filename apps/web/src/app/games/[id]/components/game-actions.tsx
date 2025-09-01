"use client";

import { useGame } from "@/app/games/[id]/components/game-context-provider";
import { usePlayer } from "@/app/games/components/player-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { gameJoin, gameStart } from "@/lib/socket/game";
import { GamepadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function GameActions() {
  const { player } = usePlayer();
  const { players, game } = useGame();
  const isHost = !!(game?.hostId == player?.id);
  const isParticipant = !!players.find((p) => p.id === player?.id);
  const buttonJoinLabel = isParticipant ? "Joined" : "Join";
  const [starting, setStarting] = useState(false);

  const handleCopyClick = useDebounce(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy link to clipboard");
    }
  }, 500);

  const onJoin = () => {
    if (!player || !game) return;

    gameJoin({ gameId: game.id, playerId: player.id });
  };

  const onStart = async () => {
    setStarting(true);
    if (!player || !game || player?.id !== game.hostId) return;

    gameStart({ id: game.id });
  };

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
          <Button onClick={onStart} disabled={starting}>
            Start
          </Button>
        ) : (
          <Button disabled={isParticipant} onClick={onJoin}>
            {buttonJoinLabel}
          </Button>
        )}
      </div>
    </>
  );
}
