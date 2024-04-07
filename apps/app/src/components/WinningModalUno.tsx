import animationData from "@/assets/lottie/winning2.json";
import { PlayerWithHand, Uno, usePlayer } from "@/store";
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
import { UnoCard } from "./UnoCard";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export function WinningModalUno({
  uno,
  players,
}: {
  uno: Uno;
  players: PlayerWithHand[];
}) {
  const { player } = usePlayer();
  const isWinner = player?.id === uno.winnerID;
  const winner = players.find((p) => p.id === uno.winnerID)?.name;

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
            {isWinner ? "You win!" : `${winner} wins!`}
          </Typography>
          <Stack
            sx={{
              width: "100%",
              mb: 5,
            }}
          >
            {players.map((p) => (
              <Stack
                key={p.id}
                sx={{
                  display: p.id === uno.winnerID ? "none" : "flex",
                  alignItems: "center",
                }}
              >
                <Typography level="h4">{p.name}</Typography>
                <Box>
                  {p.hand.cards?.map((card) => (
                    <Box
                      key={card.id}
                      sx={{
                        display: "inline-block",
                        "&:not(:first-of-type)": {
                          marginLeft: `-20px`,
                        },
                      }}
                    >
                      <UnoCard card={card} />
                    </Box>
                  ))}
                </Box>
              </Stack>
            ))}
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
