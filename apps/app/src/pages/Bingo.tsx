import { BingoBalls, BingoBoard } from "@/components";
import { useBingoSubscription, useBingoWithPlayersBoard } from "@/store";
import { Stack } from "@mui/joy";
import { useParams } from "react-router-dom";

export function Bingo() {
  const { id } = useParams();
  const { emit, progress } = useBingoSubscription(id!);
  const { data, isLoading, isError } = useBingoWithPlayersBoard(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const { bingo, board } = data!;

  return (
    <Stack sx={{ alignItems: "center", px: 3, py: 5, gap: 3 }}>
      <BingoBalls history={bingo.history} progress={progress} />
      <BingoBoard board={board} history={bingo.history} emit={emit} />
    </Stack>
  );
}
