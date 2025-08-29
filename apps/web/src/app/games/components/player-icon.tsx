"use client";

import { usePlayer } from "@/app/games/components/player-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PlayerIcon() {
  const { player, togglePlayerModal } = usePlayer();

  if (!player) return null;

  return (
    <Avatar
      className="w-10 h-10 cursor-pointer"
      onClick={() => togglePlayerModal()}
    >
      <AvatarImage src={player.avatar} />
      <AvatarFallback>P</AvatarFallback>
    </Avatar>
  );
}
