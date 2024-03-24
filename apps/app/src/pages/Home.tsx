import BingoImage from "@/assets/bingo.jpg";
import QuizImage from "@/assets/quiz.jpg";
import TypingImage from "@/assets/typing.jpg";
import UnoImage from "@/assets/uno.jpg";
import { GameCard } from "@/components";
import { useBingoCreate, usePlayer } from "@/store";
import { Box, Stack, Typography } from "@mui/joy";

export function Home() {
  const { player } = usePlayer();
  const { mutate, isLoading } = useBingoCreate();
  const onCreateBingo = () => {
    if (player) {
      mutate(player.id);
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
          />
          <GameCard
            title="Key Racer"
            img={TypingImage}
            handleClick={() => {}}
            isLoading={false}
          />
          <GameCard
            title="Bingo"
            img={BingoImage}
            handleClick={onCreateBingo}
            isLoading={isLoading}
            isAvailable
          />
          <GameCard
            title="Uno"
            img={UnoImage}
            handleClick={() => {}}
            isLoading={false}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
