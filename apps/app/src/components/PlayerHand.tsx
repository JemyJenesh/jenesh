import { Card, PlayerWithHand } from "@/store";
import { Box, Typography } from "@mui/joy";
import { UnoCard } from ".";

export function PlayerHand({
  player,
  active,
  canThrow,
  discard,
}: {
  player: PlayerWithHand;
  active: boolean;
  canThrow: boolean;
  discard: (card: Card) => void;
}) {
  const { hand } = player;
  const cardSpread = active ? 30 : 50;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {active && (
        <Typography level="h4" color="primary">
          Your turn
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
        }}
      >
        {hand.cards?.map((card) => (
          <Box
            key={card.id}
            sx={{
              display: "inline-block",
              transition: "transform 0.2s",
              cursor: canThrow ? "pointer" : "not-allowed",
              filter: `brightness(${active ? 100 : 70}%)`,
              ...(active && {
                "&:hover": {
                  transform: "translateY(-20px) scale(1.1)",
                },
                "&:hover ~ div": {
                  transform: `translateX(${cardSpread}px)`,
                },
              }),
              "&:not(:first-of-type)": {
                marginLeft: `-${cardSpread}px`,
              },
            }}
          >
            <UnoCard card={card} onClick={() => discard(card)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
