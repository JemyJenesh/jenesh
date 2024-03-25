import { Board, GetBingoWithPlayersBoardResponse, usePlayer } from "@/store";
import StarIcon from "@mui/icons-material/StarPurple500";
import { Avatar, Box, Typography } from "@mui/joy";
import { useState } from "react";
import { useQueryClient } from "react-query";

const CELL_SIZE = 75;

function getWinningPattern(board: Board): number[] {
  const { spots } = board;

  let winningCases = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  for (const cases of winningCases) {
    const isAllMarked = cases.every((index) => spots[index].marked);

    if (isAllMarked) {
      return cases;
    }
  }

  return [];
}

function Cell({
  index,
  text,
  marked,
  isMarkable,
  highlight = false,
  onClick,
}: {
  index: number;
  text: string;
  marked: boolean;
  isMarkable: boolean;
  highlight?: boolean;
  onClick: (text: string, index: number) => void;
}) {
  const value = text.slice(1);

  return (
    <Box
      sx={{
        height: CELL_SIZE,
        width: CELL_SIZE,
        display: "grid",
        placeContent: "center",
        cursor: "pointer",
        backgroundColor: "white",
      }}
      onClick={() => onClick(text, index)}
    >
      {marked ? (
        <Avatar
          sx={{
            "--Avatar-size": "70px",
            fontSize: "24px",
          }}
          color={highlight ? "primary" : "neutral"}
          variant={highlight ? "solid" : "soft"}
        >
          {value === "ree" ? <StarIcon sx={{ fontSize: 40 }} /> : value}
        </Avatar>
      ) : (
        <Typography
          level="h4"
          color={isMarkable ? "primary" : undefined}
          sx={{
            fontSize: "24px",
            fontWeight: isMarkable && !marked ? "bold" : "normal",
            animation: isMarkable
              ? "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              : undefined,
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
}

export function BingoBoard({
  board,
  history,
  emit,
}: {
  board: Board;
  history: string[];
  emit: (event: string, data: any) => void;
}) {
  const queryClient = useQueryClient();
  const { player } = usePlayer();
  const [spots, setSpots] = useState(board.spots);
  const pattern = getWinningPattern(board);

  const handleClick = async (value: string, i: number) => {
    if (spots[i].marked) {
      return;
    }
    if (history.includes(value)) {
      const newSpots = spots.map((spot, index) =>
        index === i ? { ...spot, marked: true } : spot
      );
      setSpots(newSpots);
      const updatedBoard = {
        ...board,
        spots: newSpots,
      };
      queryClient.setQueriesData(
        ["bingos", "board", board.bingoID, player?.id],
        (prev: any) => {
          if (prev) {
            const { bingo, players } = prev as GetBingoWithPlayersBoardResponse;
            const data: GetBingoWithPlayersBoardResponse = {
              bingo,
              players,
              board: updatedBoard,
            };
            return data;
          }
          return prev;
        }
      );
      emit("update-board", { board: updatedBoard });
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            px: 1,
            gap: 1,
            width: `${5 * CELL_SIZE + 6 * 8}px`,
            backgroundColor: "#F1EAD7",
            display: "grid",
            gridTemplateColumns: `repeat(5, ${CELL_SIZE}px)`,
            gridTemplateRows: `${CELL_SIZE}px`,
          }}
        >
          <Typography
            sx={{ fontSize: "3rem", textAlign: "center", fontWeight: "bold" }}
          >
            B
          </Typography>
          <Typography
            sx={{ fontSize: "3rem", textAlign: "center", fontWeight: "bold" }}
          >
            I
          </Typography>
          <Typography
            sx={{ fontSize: "3rem", textAlign: "center", fontWeight: "bold" }}
          >
            N
          </Typography>
          <Typography
            sx={{ fontSize: "3rem", textAlign: "center", fontWeight: "bold" }}
          >
            G
          </Typography>
          <Typography
            sx={{ fontSize: "3rem", textAlign: "center", fontWeight: "bold" }}
          >
            O
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1,
            pt: 0,
            gap: 1,
            width: `${5 * CELL_SIZE + 6 * 8}px`,
            backgroundColor: "#F1EAD7",
            display: "grid",
            gridTemplateColumns: `repeat(5, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(5, ${CELL_SIZE}px)`,
            gridAutoFlow: "column",
          }}
        >
          {spots.map(({ value, marked }, i) => (
            <Cell
              key={i}
              index={i}
              text={value}
              marked={marked}
              isMarkable={history?.includes(value)}
              highlight={pattern.includes(i)}
              onClick={handleClick}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
