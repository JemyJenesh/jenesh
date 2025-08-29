import GameCard from "@/app/games/components/game-card";

const games: {
  key: string;
  name: string;
  type: "BINGO";
  image: string;
  disabled?: boolean;
}[] = [
  {
    key: "bingo",
    name: "Bingo",
    type: "BINGO",
    image: "/img/bingo.jpg",
  },
  {
    key: "uno",
    name: "Uno",
    type: "BINGO",
    image: "/img/uno.jpg",
    disabled: true,
  },
  // {
  //   key: "quizy",
  //   name: "Quizy",
  //   type: "BINGO",
  //   image: "/img/quiz.jpg",
  //   disabled: true,
  // },
  // {
  //   key: "type-racer",
  //   name: "Type Racer",
  //   type: "BINGO",
  //   image: "/img/typing.jpg",
  //   disabled: true,
  // },
];

export default function GameList() {
  return games.map(({ key, ...game }) => <GameCard key={key} {...game} />);
}
