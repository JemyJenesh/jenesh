import { PlayerWithHand } from "@/store";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/joy";
import { UnoCard } from "./UnoCard";

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
      <Typography level="title-lg">{name}</Typography>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
            height: 40,
            width: 27,
            display: "grid",
            placeContent: "center",
            borderRadius: "4px",
            backgroundColor: "gray",
          }}
        >
          <Typography level="h4" textColor={"common.white"}>
            {hand.cards.length}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: "relative", width: "100px", height: "150px" }}>
        {player.hand.cards.map((card) => (
          <Box key={card.id} sx={{ position: "absolute", inset: 0 }}>
            <UnoCard card={card} showBack />
          </Box>
        ))}
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
        {hand.effect && (
          <Chip color="danger" variant="solid" size="lg">
            {hand.effect}
          </Chip>
        )}
      </Box>
    </Stack>
  );
}
