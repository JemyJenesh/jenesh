import Auth from "@/services/Auth";
import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export type Player = {
  id: string;
  name: string;
  avatar: string;
};

type PlayerContextProps = {
  player: Player | null;
  setPlayer: (player: Player) => void;
};
const PlayerContext = createContext<PlayerContextProps>({
  player: Auth.getPlayerData(),
  setPlayer: () => null,
});

export function PlayerContextProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player | null>(Auth.getPlayerData());

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}

export function usePlayerCreate() {
  const createPlayer = async (player: Partial<Player>): Promise<Player> => {
    const res = await axios.post("/api/players", player);
    return res.data;
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setPlayer } = usePlayer();
  const mutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: (data) => {
      if (data.id) {
        Auth.setPlayerData(data);
        setPlayer(data);
        const redirect = searchParams.get("r");
        navigate(redirect ?? "/");
      }
    },
  });

  return mutation;
}
