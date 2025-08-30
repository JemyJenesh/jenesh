"use client";

import Loader from "@/components/loader";
import { axiosInstance } from "@/lib/axios";
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

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const togglePlayerModal = (open?: boolean) => {
    if (typeof open === "boolean") {
      setIsPlayerModalOpen(open);
      return;
    }

    setIsPlayerModalOpen(!isPlayerModalOpen);
  };

  useEffect(() => {
    const loadPlayer = async () => {
      setLoading(true);
      const playerId = localStorage.getItem("playerId");

      if (!playerId) {
        setIsPlayerModalOpen(true);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosInstance.get<Player>(
          `/api/players/${playerId}`
        );

        setPlayer(data);
      } catch (err) {
        setIsPlayerModalOpen(true);
      }

      setLoading(false);
    };

    loadPlayer();
  }, []);

  return (
    <PlayerContext.Provider
      value={{ isPlayerModalOpen, player, setPlayer, togglePlayerModal }}
    >
      {loading ? <Loader /> : children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
