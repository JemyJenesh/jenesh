import axios from "axios";

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
