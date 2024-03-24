import { BingoBoard } from "@/components";
import { useBingoSubscription, useBingoWithPlayersBoard } from "@/store";
import { Typography } from "@mui/joy";
import { useParams } from "react-router-dom";

export function Bingo() {
  const { id } = useParams();
  const emit = useBingoSubscription(id!);
  const { data, isLoading, isError } = useBingoWithPlayersBoard(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const { bingo, board } = data!;

  return (
    <div>
      <p>Bingo {id}</p>
      <Typography>{bingo.history[bingo.history.length - 1] ?? "-"}</Typography>
      <BingoBoard board={board} history={bingo.history} emit={emit} />
    </div>
  );
}
