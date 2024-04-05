import { Card } from "@/store";

export function UnoCard({
  card,
  onClick,
}: {
  card: Card;
  onClick?: () => void;
}) {
  const { color, value } = card;

  return (
    <img
      style={{
        height: 150,
      }}
      draggable={false}
      src={`/static/uno/${color}_${value}.png`}
      onClick={onClick}
    />
  );
}
