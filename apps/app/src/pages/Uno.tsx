import { OpponentHand, PlayerHand, UnoCard } from "@/components";
import { usePlayer, useUnoSubscription, useUnoWithHands } from "@/store";
import { Box, Button, Stack } from "@mui/joy";
import { useParams } from "react-router-dom";

export function Uno() {
  const { id } = useParams();
  const { player } = usePlayer();
  const { data, isError, isLoading } = useUnoWithHands(id!);
  const { emit } = useUnoSubscription(id!);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const { players, uno } = data!;
  const playerIndex = players.findIndex((p) => p.id === player?.id);
  const otherPlayers = [
    ...players.slice(playerIndex + 1),
    ...players.slice(0, playerIndex),
  ];
  const playerHand = players[playerIndex];
  const isMyTurn = uno.turn === playerIndex;
  const discardCard = uno.discardPile[uno.discardPile.length - 1];
  const canDraw = !playerHand.hand.cards.some(
    (card) =>
      card.color === discardCard.color ||
      card.value === discardCard.value ||
      card.type === "wild"
  );

  const handleDraw = () => {
    emit("draw", {
      handID: playerHand.hand.id,
      unoID: id,
    });
  };

  const renderDrawPile = () => {
    return (
      <Stack spacing={1}>
        <img
          style={{
            height: 150,
          }}
          draggable={false}
          src={`/static/uno/deck.png`}
        />

        <Button
          sx={{ visibility: canDraw ? "visible" : "hidden" }}
          variant="soft"
          onClick={handleDraw}
        >
          Draw
        </Button>
      </Stack>
    );
  };
  const renderDiscardPile = () => {
    return discardCard && <UnoCard card={discardCard} />;
  };

  return (
    <Stack
      sx={{
        p: 2,
        height: "100%",
        justifyContent: "space-between",
        backgroundColor: "#cbe1f5",
      }}
      spacing={2}
    >
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        {otherPlayers.map((player) => (
          <OpponentHand key={player.id} player={player} />
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {renderDrawPile()}
        {renderDiscardPile()}
      </Box>
      <PlayerHand player={playerHand} active={isMyTurn} />
    </Stack>
  );
}
