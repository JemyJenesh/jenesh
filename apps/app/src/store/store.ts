import { PlayerSlice, createPlayerSlice } from "@/store/player";
import { create } from "zustand";

export const useAppStore = create<PlayerSlice>((...a) => ({
  ...createPlayerSlice(...a),
}));
