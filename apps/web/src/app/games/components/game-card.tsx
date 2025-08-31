"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateOne } from "@/hooks/api";
import type { Game, GameCreateInput } from "@/schema/game";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type GameCardProps = {
  name: string;
  image: string;
  type: "BINGO";
  disabled?: boolean;
};

export default function GameCard({
  name,
  image,
  type,
  disabled = false,
}: GameCardProps) {
  const { player } = usePlayer();
  const router = useRouter();
  const { mutate, isPending } = useCreateOne<Game, GameCreateInput>({
    path: "/api/games",
    queryKey: "games",
    message: {
      success: "Play bingo!",
    },
  });
  const buttonLabel = isPending ? "Initiating..." : "Play";

  const onClick = () => {
    if (!player) return;

    mutate(
      {
        type,
        hostId: player.id,
      },
      {
        onSuccess: (data) => {
          router.push(`/games/${data.id}`);
        },
      }
    );
  };

  return (
    <Card className="gap-3 p-0">
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            fill
            src={image}
            alt={name}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover rounded-b-none"
            priority
          />
        </AspectRatio>
      </CardContent>
      <CardHeader className="gap-0 flex justify-between pb-3">
        <CardTitle className="text-xl">{name}</CardTitle>

        <Button onClick={onClick} disabled={disabled || isPending}>
          {isPending && <Loader2Icon className="animate-spin" />}
          {buttonLabel}
        </Button>
      </CardHeader>
    </Card>
  );
}
