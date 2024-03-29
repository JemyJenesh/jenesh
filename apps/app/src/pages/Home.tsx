import BingoImage from "@/assets/bingo.jpg";
import QuizImage from "@/assets/quiz.jpg";
import TypingImage from "@/assets/typing.jpg";
import UnoImage from "@/assets/uno.jpg";
import { GameCard } from "@/components";
import { useBingoCreate, usePlayer, useUnoCreate } from "@/store";
import { Box, Stack, Typography } from "@mui/joy";

export function Home() {
  const { player } = usePlayer();
  const bingoMutation = useBingoCreate();
  const unoMutation = useUnoCreate();
  const onBingoCreate = () => {
    if (player) {
      bingoMutation.mutate(player.id);
    }
  };
  const onUnoCreate = () => {
    if (player) {
      unoMutation.mutate(player.id);
    }
  };

  return (
    <Stack spacing={10}>
      <Box sx={{ p: 10, backgroundColor: "whitesmoke" }}>
        <Typography level="h1" textAlign={"center"}>
          The site is under construction.
        </Typography>
        <Typography level="body-lg" textAlign={"center"}>
          But you can play games here!
        </Typography>
      </Box>
      <Stack alignItems={"center"}>
        <Typography level="h1" gutterBottom>
          Available Games
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <GameCard
            title="Quizy"
            img={QuizImage}
            handleClick={() => {}}
            isLoading={false}
            isAvailable={false}
          />
          <GameCard
            title="Key Racer"
            img={TypingImage}
            handleClick={() => {}}
            isLoading={false}
            isAvailable={false}
          />
          <GameCard
            title="Bingo"
            img={BingoImage}
            handleClick={onBingoCreate}
            isLoading={bingoMutation.isLoading}
          />
          <GameCard
            title="Uno"
            img={UnoImage}
            handleClick={onUnoCreate}
            isLoading={unoMutation.isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
