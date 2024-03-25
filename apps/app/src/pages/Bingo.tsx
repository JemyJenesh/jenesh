import { BingoBalls, BingoBoard, WinningModal } from "@/components";
import {
  useBingoSubscription,
  useBingoWithPlayersBoard,
  usePlayer,
} from "@/store";
import { Stack } from "@mui/joy";
import { useParams } from "react-router-dom";

export function Bingo() {
  const { id } = useParams();
  const { player } = usePlayer();
  const { emit, progress } = useBingoSubscription(id!);
  const { data, isLoading, isError } = useBingoWithPlayersBoard(
    id!,
    player?.id!
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const { bingo, board, players } = data!;

  return (
    <Stack sx={{ alignItems: "center", px: 3, py: 5, gap: 3 }}>
      <BingoBalls history={bingo.history} progress={progress} />
      <BingoBoard board={board} history={bingo.history} emit={emit} />
      <WinningModal board={board} players={players} winnerID={bingo.winnerID} />
    </Stack>
  );
}
