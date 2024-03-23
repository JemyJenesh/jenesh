import Auth from "@/services/Auth";
import { StateCreator } from "zustand";

export type Player = {
  id: string;
  name: string;
  avatar: string;
};

export type PlayerSlice = {
  player: Player | null;
  fetchPlayer: () => void;
  setPlayer: (player: Player) => void;
  updatePlayer: (player: Partial<Player>) => void;
};

export const createPlayerSlice: StateCreator<
  PlayerSlice,
  [],
  [],
  PlayerSlice
> = (set) => ({
  player: Auth.getPlayerData(),
  fetchPlayer: () => set(() => ({ player: Auth.getPlayerData() })),
  setPlayer: (player) =>
    set(() => {
      Auth.setPlayerData(player);
      return { player };
    }),
  updatePlayer: (player) =>
    set((state) => {
      if (!state.player) {
        return state;
      }

      return { player: { ...state.player, ...player } };
    }),
});
