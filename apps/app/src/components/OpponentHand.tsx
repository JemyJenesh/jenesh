import { PlayerWithHand } from "@/store";
import { Avatar, Box, Stack, Typography } from "@mui/joy";

export function OpponentHand({
  player,
  turnPlayerID,
}: {
  player: PlayerWithHand;
  turnPlayerID: string;
}) {
  const { id, hand, name, avatar } = player;
  const active = id === turnPlayerID;

  return (
    <Stack spacing={1} alignItems={"center"}>
      <Typography>{name}</Typography>
      <Avatar
        size="lg"
        src={avatar}
        sx={{
          "--Avatar-size": "75px",
          animation: active ? "ping 1s infinite" : undefined,
        }}
      />

      <Box
        sx={{
          height: 80,
          width: 55,
          display: "grid",
          placeContent: "center",
          borderRadius: "4px",
          backgroundColor: "gray",
          border: "3px solid white",
        }}
      >
        <Typography level="h4" textColor={"common.white"}>
          {hand.cards.length}
        </Typography>
      </Box>
    </Stack>
  );
}
