"use client";

import type { Player } from "@/schema/player";
import { createContext, useContext, useEffect, useState } from "react";

type InitialPlayerContext = {
  isPlayerModalOpen: boolean;
  player: Player | null;
  setPlayer: (player: Player) => void;
  togglePlayerModal: (open?: boolean) => void;
};

const PlayerContext = createContext<InitialPlayerContext>({
  isPlayerModalOpen: false,
  player: null,
  setPlayer: () => {},
  togglePlayerModal: () => {},
});

export function PlayerProvider({
  children,
  initialPlayer,
}: {
  children: React.ReactNode;
  initialPlayer: Player | null;
}) {
  const [player, setPlayer] = useState(initialPlayer);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const togglePlayerModal = (open?: boolean) => {
    if (typeof open === "boolean") {
      setIsPlayerModalOpen(open);
      return;
    }

    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  useEffect(() => {
    if (!initialPlayer) {
      setIsPlayerModalOpen(true);
    }
  }, [initialPlayer, setIsPlayerModalOpen]);

  return (
    <PlayerContext.Provider
      value={{ isPlayerModalOpen, player, setPlayer, togglePlayerModal }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
