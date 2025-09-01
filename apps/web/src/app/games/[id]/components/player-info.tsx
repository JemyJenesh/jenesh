"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Player } from "@/schema/player";
import Image from "next/image";

export default function PlayerInfo({
  hostId,
  player,
}: {
  hostId: string;
  player: Player;
}) {
  const { player: you } = usePlayer();

  const isYou = player.id === you?.id;
  const isHost = player.id === hostId;

  return (
    <Card className="gap-3 w-64 py-4">
      <CardContent>
        <Image
          height={128}
          width={128}
          src={player.avatar}
          alt={player.name}
          className="mx-auto"
        />
      </CardContent>
      <CardHeader className="flex flex-col items-center px-4 gap-0">
        <CardTitle className={cn("text-xl", { "text-primary": isYou })}>
          {player.name} {isYou && "(you)"}
        </CardTitle>
        {isHost && <CardDescription>Host</CardDescription>}
      </CardHeader>
    </Card>
  );
}
