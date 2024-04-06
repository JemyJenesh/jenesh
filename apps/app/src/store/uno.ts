import axios from "@/services/Axios";
import { useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Player } from ".";

export type Card = {
  id: string;
  type: "number" | "action" | "wild";
  color: "red" | "yellow" | "blue" | "green" | "wild";
  value:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "draw-two"
    | "skip"
    | "reverse"
    | "wild"
    | "draw-four";
  selectedColor?: "red" | "yellow" | "blue" | "green" | "wild";
};
export type Uno = {
  id: string;
  drawPile: Card[];
  discardPile: Card[];
  turn: number;
  direction: -1 | 1;
  state: "waiting" | "serving" | "started" | "over";
  playerIDs: string[];
  winnerID?: string;
};
export type Hand = {
  id: string;
  playerID: string;
  unoID: string;
  cards: Card[];
  effect?: string;
};

export function useUnoCreate() {
  const createUno = async (hostID: string): Promise<Uno> => {
    const res = await axios.post("/api/unos", {
      hostID,
    });
    return res.data;
  };

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createUno,
    onSuccess: (data) => {
      if (data.id) navigate(`/unos/${data.id}/room`);
    },
  });

  return mutation;
}

export type GetUnoResponse = {
  uno: Uno;
  players: Player[];
};
export function useUno(id: string) {
  const getUno = async (id: string): Promise<GetUnoResponse> => {
    const res = await axios.get(`/api/unos/${id}`);
    return res.data;
  };

  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["unos", id],
    queryFn: () => getUno(id!),
    onSuccess: (data) => {
      if (!data) {
        navigate("/");
      }
    },
  });

  return query;
}

export type PlayerWithHand = Player & {
  hand: Hand;
};
export type GetUnoWithHandsResponse = {
  uno: Uno;
  players: PlayerWithHand[];
};
export function useUnoWithHands(id: string) {
  const getUno = async (): Promise<GetUnoWithHandsResponse> => {
    const res = await axios.get(`/api/unos/${id}/hands`);
    return res.data;
  };

  const query = useQuery({
    queryKey: ["unos", "hands", id],
    queryFn: () => getUno(),
  });

  return query;
}

export const useUnoSubscription = (id: string) => {
  const queryClient = useQueryClient();
  let socket = useRef<Socket>();
  const emit = (event: string, data: any) => {
    socket.current?.emit(event, data);
  };
  let intervalID: NodeJS.Timeout;

  const updateUno = ({ uno, hand }: { uno: Uno; hand: Hand }) => {
    queryClient.setQueriesData(["unos", "hands", id], (prev: any) => {
      if (prev) {
        const { players } = prev as GetUnoWithHandsResponse;
        const data: GetUnoResponse = {
          uno,
          players: players.map((p) =>
            p.id === hand.playerID ? { ...p, hand } : p
          ),
        };
        return data;
      }
      return prev;
    });
  };

  useEffect(() => {
    socket.current = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socket.current.on("connect", () => {
      socket.current?.emit("subscribe-uno", { unoID: id });
    });

    socket.current.on("card-drawn", updateUno);

    socket.current.on("card-thrown", updateUno);

    socket.current.on("hand-updated", updateUno);

    return () => {
      clearInterval(intervalID);
      socket.current?.close();
    };
  }, [queryClient]);

  return { emit };
};

export const useUnoRoomSubscription = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let socket = useRef<Socket>();
  const emit = (event: string, data: any) => {
    socket.current?.emit(event, data);
  };

  useEffect(() => {
    socket.current = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socket.current.on("connect", () => {
      socket.current?.emit("subscribe-uno", { unoID: id });
    });

    socket.current.on("player-joined", (player: Player) => {
      queryClient.setQueriesData(["unos", id], (prev: any) => {
        if (prev) {
          const { uno, players } = prev as GetUnoResponse;
          const data: GetUnoResponse = {
            uno: { ...uno, playerIDs: [...uno.playerIDs, player.id] },
            players: [...players, player],
          };
          return data;
        }
        return prev;
      });
    });

    socket.current.on("uno-started", () => {
      navigate(`/unos/${id}`);
    });

    return () => {
      socket.current?.close();
    };
  }, [queryClient]);

  return { emit };
};
