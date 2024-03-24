import { Player, usePlayer } from "@/store";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export function PlayerCard({ player }: { player: Player }) {
  const { id, avatar, name } = player;
  const { player: currentPlayer } = usePlayer();
  const isMe = currentPlayer?.id === id;

  return (
    <Card
      variant={isMe ? "soft" : "outlined"}
      sx={{
        width: 120,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={avatar} height={75} width={75} />
      </Box>
      <CardContent>
        <Typography textAlign="center" noWrap title={name}>
          {isMe ? "You" : name}
        </Typography>
      </CardContent>
    </Card>
  );
}
