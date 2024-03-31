import { PlayerWithHand } from "@/store";
import { Avatar, Box, Stack, Typography } from "@mui/joy";

export function OpponentHand({ player }: { player: PlayerWithHand }) {
  const { hand, name, avatar } = player;

  return (
    <Stack spacing={1} alignItems={"center"}>
      <Typography>{name}</Typography>
      <Avatar size="lg" src={avatar} />
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
