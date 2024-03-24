import axios from "@/services/Axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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
