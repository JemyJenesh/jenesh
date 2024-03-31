import { PlayerWithHand } from "@/store";
import { Box } from "@mui/joy";
import { UnoCard } from ".";

export function PlayerHand({
  player,
  active,
}: {
  player: PlayerWithHand;
  active: boolean;
}) {
  const { hand } = player;
  const cardSpread = active ? 30 : 50;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {hand?.map((card) => (
        <Box
          key={card.id}
          sx={{
            display: "inline-block",
            transition: "transform 0.2s",
            filter: `brightness(${active ? 100 : 70}%)`,
            ...(active && {
              "&:hover": {
                cursor: "pointer",
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
          <UnoCard card={card} />
        </Box>
      ))}
    </Box>
  );
}
