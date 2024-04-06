import { PlayerWithHand } from "@/store";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/joy";

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
      <Box sx={{ position: "relative" }}>
        <Avatar
          size="lg"
          src={avatar}
          sx={{
            "--Avatar-size": "75px",
            zIndex: 2,
          }}
        />
        <Box
          sx={{
            height: "75px",
            width: "75px",
            borderRadius: "50%",
            bgcolor: "primary.solidBg",
            opacity: 0.75,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            animation: active ? "ping 1s infinite" : undefined,
          }}
        />
      </Box>

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
      <Box>
        {hand.cards.length === 1 && (
          <Chip color="primary" variant="solid" size="lg">
            Uno
          </Chip>
        )}
        {hand.cards.length === 0 && (
          <Chip color="primary" variant="solid" size="lg">
            Winner
          </Chip>
        )}
      </Box>
    </Stack>
  );
}
