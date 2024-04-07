import { Card } from "@/store";
import { motion } from "framer-motion";

export function UnoCard({
  card,
  onClick,
  showBack = false,
}: {
  card: Card;
  showBack?: boolean;
  onClick?: () => void;
}) {
  const { color, value } = card;

  return (
    <motion.div
      key={card.id}
      layout
      layoutId={card.id}
      initial={{
        rotateY: showBack ? 180 : 0,
      }}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={onClick}
    >
      <img
        style={{
          height: 150,
          transform: "translateZ(1px)",
        }}
        draggable={false}
        src={`/static/uno/${color}_${value}.png`}
      />
      <img
        style={{
          height: 150,
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotateY(180deg)",
        }}
        draggable={false}
        src={`/static/uno/deck.png`}
      />
    </motion.div>
  );
}
