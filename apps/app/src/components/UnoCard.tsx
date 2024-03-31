import { Card } from "@/store";

export function UnoCard({ card }: { card: Card }) {
  const { color, value } = card;

  return (
    <img
      style={{
        height: 150,
      }}
      draggable={false}
      src={`/static/uno/${color}_${value}.png`}
    />
  );
}
