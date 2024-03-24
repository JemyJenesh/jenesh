import axios from "@/services/Axios";
import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Player } from ".";

export type Bingo = {
  id: string;
  hostID: string;
  history: string[];
  playerIDs: string[];
  winnerID?: string;
  state: "waiting" | "started" | "over";
};

export function useBingoCreate() {
  const createBingo = async (hostID: string): Promise<Bingo> => {
    const res = await axios.post("/api/bingos", {
      hostID,
    });
    return res.data;
  };

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBingo,
    onSuccess: (data) => {
      if (data.id) navigate(`/bingos/${data.id}/room`);
    },
  });

  return mutation;
}

export type GetBingoResponse = {
  bingo: Bingo;
  players: Player[];
};
export function useBingo(id: string) {
  const getBingo = async (id: string): Promise<GetBingoResponse> => {
    const res = await axios.get(`/api/bingos/${id}`);
    return res.data;
  };

  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["bingos", id],
    queryFn: () => getBingo(id!),
    onSuccess: (data) => {
      if (!data) {
        navigate("/");
      }
    },
  });

  return query;
}

export const useBingoSubscription = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socket.current.on("connect", () => {
      socket.current?.emit("subscribe-bingo", { bingoID: id });
    });

    socket.current.on("player-joined", (player: Player) => {
      queryClient.setQueriesData(["bingos", id], (prev: any) => {
        if (prev) {
          const { bingo, players } = prev as GetBingoResponse;
          const data: GetBingoResponse = {
            bingo: { ...bingo, playerIDs: [...bingo.playerIDs, player.id] },
            players: [...players, player],
          };
          return data;
        }
        return prev;
      });
    });

    socket.current.on("bingo-started", () => {
      navigate(`/bingos/${id}`);
    });

    return () => {
      socket.current?.close();
    };
  }, [queryClient]);

  return (event: string, data: any) => {
    socket.current?.emit(event, data);
  };
};
