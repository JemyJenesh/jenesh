import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type Bingo = {
  id: string;
  hostID: string;
  history: string[];
  playerIDs: string[];
  winnerID?: string;
  state: "waiting" | "started" | "over";
};

export async function createBingo(hostID: string): Promise<Bingo> {
  const res = await axios.post("/api/bingos", {
    hostID,
  });
  return res.data;
}

export async function getBingo(id: string): Promise<Bingo> {
  const res = await axios.get(`/api/bingos/${id}`);
  return res.data;
}

export function useCreateBingo() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createBingo,
    onSuccess: (data) => {
      if (data.id) navigate(`/bingos/${data.id}/room`);
    },
  });

  return mutation;
}
