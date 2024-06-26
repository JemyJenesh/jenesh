import {
  ColorList,
  ColorModal,
  DirectionIndicator,
  OpponentHand,
  PlayerHand,
  UnoCard,
  WinningModalUno,
} from "@/components";
import { Card, usePlayer, useUnoSubscription, useUnoWithHands } from "@/store";
import { Box, Button, Stack } from "@mui/joy";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function Uno() {
  const { id } = useParams();
  const { player } = usePlayer();
  const { data, isError, isLoading } = useUnoWithHands(id!);
  const { emit } = useUnoSubscription(id!);
  const [showColorModal, setShowColorModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const { players, uno } = data!;
  const playerIndex = players.findIndex((p) => p.id === player?.id);
  const otherPlayers = [
    ...players.slice(playerIndex + 1),
    ...players.slice(0, playerIndex),
  ];
  const playerHand = players[playerIndex];
  const turnPlayerID = players[uno.turn].id;
  const isMyTurn = turnPlayerID === playerHand.id;
  const discardCard = uno.discardPile[uno.discardPile.length - 1];
  const canThrow = playerHand.hand.cards.some(
    (card) =>
      card.color === discardCard.selectedColor ||
      card.value === discardCard.value ||
      card.type === "wild"
  );
  const canDraw = isMyTurn && !canThrow;

  const handleDraw = () => {
    if (!canDraw) return;
    emit("draw", {
      handID: playerHand.hand.id,
      unoID: id,
    });
  };
  const handleDiscard = (card: Card) => {
    if (!canThrow || !isMyTurn) return;
    if (card.type === "wild") {
      setSelectedCard(card);
      setShowColorModal(true);
    } else if (
      card.color === discardCard.selectedColor ||
      card.value === discardCard.value
    ) {
      emit("discard", {
        handID: playerHand.hand.id,
        unoID: id,
        cardID: card.id,
      });
    }
  };

  const handleWildCardDiscard = (color: string) => {
    emit("discard", {
      handID: playerHand.hand.id,
      unoID: id,
      cardID: selectedCard?.id,
      chosenColor: color,
    });
    setShowColorModal(false);
  };

  const renderDrawPile = () => {
    return (
      <Stack spacing={1}>
        <Box sx={{ position: "relative", width: "100px", height: "150px" }}>
          {uno.drawPile.map((card) => (
            <Box key={card.id} sx={{ position: "absolute", inset: 0 }}>
              <UnoCard card={card} showBack />
            </Box>
          ))}
        </Box>

        <Button
          sx={{ visibility: canDraw ? "visible" : "hidden" }}
          onClick={handleDraw}
        >
          Draw
        </Button>
      </Stack>
    );
  };
  const renderDiscardPile = () => {
    if (!discardCard) return;
    const colors: { [key: string]: string } = {
      blue: "#3298DC",
      red: "#EA473C",
      green: "#4F984C",
      yellow: "#fac728",
    };
    return (
      <Stack spacing={1}>
        <Box sx={{ position: "relative", width: "100px", height: "150px" }}>
          {uno.discardPile.map((card) => (
            <Box key={card.id} sx={{ position: "absolute", inset: 0 }}>
              <UnoCard card={card} />
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            visibility: discardCard.type === "wild" ? "visible" : "hidden",
            height: 36,
            width: "100%",
            borderRadius: "4px",
            bgcolor: colors[discardCard.selectedColor ?? "transparent"],
          }}
        />
      </Stack>
    );
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
      <WinningModalUno uno={uno} players={players} />
      <ColorModal open={showColorModal}>
        <ColorList onSelectColor={handleWildCardDiscard} />
      </ColorModal>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        {otherPlayers.map((player) => (
          <OpponentHand
            key={player.id}
            player={player}
            turnPlayerID={turnPlayerID}
          />
        ))}
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            animationName: uno.direction === 1 ? "spin" : "spin-reverse",
            animationDuration: "5s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          <DirectionIndicator direction={uno.direction} />
        </Box>
        {renderDrawPile()}
        {renderDiscardPile()}
      </Box>
      <PlayerHand
        player={playerHand}
        active={isMyTurn}
        canThrow={canThrow}
        discard={handleDiscard}
      />
    </Stack>
  );
}
