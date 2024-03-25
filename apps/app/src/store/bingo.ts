import axios from "@/services/Axios";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Player, usePlayer } from ".";

export type Bingo = {
  id: string;
  hostID: string;
  history: string[];
  playerIDs: string[];
  winnerID?: string;
  state: "waiting" | "started" | "over";
};

export type Board = {
  id: string;
  spots: {
    value: string;
    marked: boolean;
  }[];
  playerID: string;
  bingoID: string;
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

export type GetBingoWithPlayersBoardResponse = {
  bingo: Bingo;
  board: Board;
  players: Player[];
};
export function useBingoWithPlayersBoard(id: string, playerID: string) {
  const getBingo = async (): Promise<GetBingoWithPlayersBoardResponse> => {
    const res = await axios.get(`/api/bingos/${id}/board/${playerID}`);
    return res.data;
  };

  const query = useQuery({
    queryKey: ["bingos", "board", id, playerID],
    queryFn: () => getBingo(),
  });

  return query;
}

export const useBingoRoomSubscription = (id: string) => {
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

  return { emit };
};

export const useBingoSubscription = (id: string) => {
  const [progress, setProgress] = useState(10);
  const { player } = usePlayer();
  const queryClient = useQueryClient();
  let socket = useRef<Socket>();
  const emit = (event: string, data: any) => {
    socket.current?.emit(event, data);
  };
  let intervalID: NodeJS.Timeout;

  useEffect(() => {
    intervalID = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          clearInterval(intervalID);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  }, []);

  useEffect(() => {
    socket.current = io(
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
    );

    socket.current.on("connect", () => {
      socket.current?.emit("subscribe-bingo", { bingoID: id });
    });

    socket.current.on("bingo", ({ board: winnerBoard }: { board: Board }) => {
      queryClient.setQueriesData(
        ["bingos", "board", id, player?.id!],
        (prev: any) => {
          if (prev) {
            const { board, bingo, players } =
              prev as GetBingoWithPlayersBoardResponse;
            const data: GetBingoWithPlayersBoardResponse = {
              board,
              players,
              bingo: {
                ...bingo,
                winnerID: winnerBoard.playerID,
                state: "over",
              },
            };
            return data;
          }
          return prev;
        }
      );
      clearInterval(intervalID);
    });

    socket.current.on("bingo-over", () => {
      clearInterval(intervalID);
    });

    socket.current.on("new-bingo-number", (number) => {
      queryClient.setQueriesData(
        ["bingos", "board", id, player?.id!],
        (prev: any) => {
          if (prev) {
            const { bingo, board, players } =
              prev as GetBingoWithPlayersBoardResponse;
            const data: GetBingoWithPlayersBoardResponse = {
              board,
              players,
              bingo: { ...bingo, history: [...bingo.history, number] },
            };
            return data;
          }
          return prev;
        }
      );
      setProgress(0);
      clearInterval(intervalID);
      intervalID = setInterval(() => {
        setProgress((prev) => {
          if (prev === 100) {
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    });

    return () => {
      clearInterval(intervalID);
      socket.current?.close();
    };
  }, [queryClient]);

  return { emit, progress };
};
