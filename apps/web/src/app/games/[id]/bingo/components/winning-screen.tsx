import { useBingo } from "@/app/games/[id]/bingo/components/bingo-context-provider";
import Board from "@/app/games/[id]/bingo/components/board";
import { usePlayer } from "@/app/games/components/player-provider";
import animationData from "@/assets/confetti.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function WinningScreen() {
  const { winnerState } = useBingo();
  const { player } = usePlayer();

  const isWinner = player?.id === winnerState?.player.id;

  const winnerTitle = isWinner
    ? "You win!"
    : `${winnerState?.player.name} won!`;

  if (!winnerState) return null;

  return (
    <div className="mb-6">
      <Lottie
        isClickToPauseDisabled
        style={{ position: "absolute", inset: 0 }}
        options={defaultOptions}
        height={"100%"}
        width={"100%"}
      />
      <p className="text-xl text-center mb-2">{winnerTitle}</p>

      {!isWinner && <Board board={winnerState?.board} alternateColor />}
    </div>
  );
}
