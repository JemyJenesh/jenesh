import { Player, useAppStore } from "@/store";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export function PlayerCard({ player }: { player: Player }) {
  const { id, avatar, name } = player;
  const currentPlayer = useAppStore((state) => state.player);
  const isMe = currentPlayer?.id === id;

  return (
    <Card
      variant={isMe ? "soft" : "outlined"}
      sx={{
        width: 200,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={avatar} />
      </Box>
      <CardContent>
        <Typography textAlign="center" level="title-md">
          {isMe ? "You" : name}
        </Typography>
      </CardContent>
    </Card>
  );
}
