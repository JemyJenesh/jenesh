import Auth from "@/services/Auth";
import axios from "@/services/Axios";
import { AxiosResponse } from "axios";
import { StateCreator } from "zustand";
export type Player = {
  id: string;
  name: string;
  avatar: string;
};

export type PlayerSlice = {
  isCreating: boolean;
  player: Player | null;
  fetchPlayer: () => void;
  setPlayer: (player: Player) => void;
  updatePlayer: (player: Partial<Player>) => void;
  createPlayer: (player: Partial<Player>, cb: () => void) => void;
};

export const createPlayerSlice: StateCreator<
  PlayerSlice,
  [],
  [],
  PlayerSlice
> = (set) => ({
  player: Auth.getPlayerData(),
  isCreating: false,
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
  createPlayer: (player, cb) => {
    set((state) => ({ ...state, isCreating: true }));
    axios
      .post<Partial<Player>, AxiosResponse<Player>>("/api/players", player)
      .then((response) => {
        set((state) => ({ ...state, player: response.data }));
        Auth.setPlayerData(response.data);
        cb();
      })
      .catch((err) => {
        console.log("createPlayer: ", err);
      })
      .finally(() => {
        set((state) => ({ ...state, isCreating: false }));
      });
  },
});
