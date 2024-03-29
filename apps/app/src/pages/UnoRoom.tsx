import { CopyButton, PlayerCard } from "@/components";
import { usePlayer, useUno } from "@/store";
import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/joy";
import { Navigate, useParams } from "react-router-dom";

export function UnoRoom() {
  const { id } = useParams();
  const { data, isLoading, isError } = useUno(id!);
  const { player } = usePlayer();

  const handleJoin = () => {
    // emit("join-bingo", {
    //   playerID: player?.id,
    //   bingoID: id,
    // });
  };

  const handleStart = () => {
    // emit("start-bingo", {
    //   bingoID: id,
    // });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;
  const { uno, players } = data!;

  const isInGame = players.find((p) => p.id === player?.id);
  if (isInGame && uno.state === "started")
    return <Navigate to={`/unos/${id}`} />;

  const isJoinVisible = !players.find((p) => p.id === player?.id);
  const showStart = players[0].id === player?.id;
  const canStart = players.length > 1;

  if (uno.state === "over")
    return (
      <Typography level="h3" textAlign={"center"} mt={2}>
        Uno is over
      </Typography>
    );
  if (uno.state === "started")
    return (
      <Typography level="h3" textAlign={"center"} mt={2}>
        Uno already started
      </Typography>
    );

  return (
    <Stack p={3} gap={3} alignItems={"center"}>
      <Typography level="h3">Waiting for players...</Typography>
      <Stack gap={3} direction={"row"} flexWrap={"wrap"}>
        {players.map((player) => (
          <PlayerCard key={`${player.id}`} player={player} />
        ))}
      </Stack>
      <Stack direction={"row"} gap={3}>
        <CopyButton text={window.location.href}>Copy Link</CopyButton>
        {showStart ? (
          <Button disabled={!canStart} onClick={handleStart}>
            Start Game
          </Button>
        ) : (
          <Button
            startDecorator={<AddIcon />}
            disabled={!isJoinVisible}
            onClick={handleJoin}
          >
            Join
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
