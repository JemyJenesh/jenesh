import animationData from "@/assets/lottie/winning2.json";
import { Board, Player, useBingoWithPlayersBoard, usePlayer } from "@/store";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import { BingoBoard } from ".";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export function WinningModal({
  board,
  winnerID,
  players,
}: {
  board: Board;
  players: Player[];
  winnerID?: string;
}) {
  const { player } = usePlayer();
  const { data, isLoading } = useBingoWithPlayersBoard(
    board.bingoID,
    winnerID!
  );
  const isWinner = player?.id === winnerID;
  const winner = players.find((p) => p.id === winnerID);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Modal open={!!winner}>
      <ModalOverflow>
        <ModalDialog layout="fullscreen">
          <Lottie
            isClickToPauseDisabled
            style={{ position: "absolute", inset: 0 }}
            options={defaultOptions}
            height={"100%"}
            width={"100%"}
          />
          <Typography
            level="h1"
            sx={{
              textAlign: "center",
              my: 5,
            }}
          >
            {winner?.name} won the game!
          </Typography>
          <Stack
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              mb: 5,
            }}
          >
            <Box>
              <Typography level="title-lg" textAlign={"center"}>
                Your Board
              </Typography>
              <BingoBoard board={board} history={[]} emit={() => {}} />
            </Box>
            {!isWinner && (
              <Box>
                <Typography level="title-lg" textAlign={"center"}>
                  Winner's Board
                </Typography>
                <BingoBoard board={data?.board!} history={[]} emit={() => {}} />
              </Box>
            )}
          </Stack>
          <Stack direction={"row"} justifyContent="center">
            <Button component={Link} to="/">
              Go Home
            </Button>
          </Stack>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
