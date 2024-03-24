import { Board } from "@/store";
import StarIcon from "@mui/icons-material/StarPurple500";
import { Avatar, Box, Typography } from "@mui/joy";
import { useState } from "react";

const CELL_SIZE = 75;

function Cell({
  index,
  text,
  marked,
  isMarkable,
  onClick,
}: {
  index: number;
  text: string;
  marked: boolean;
  isMarkable: boolean;
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
        >
          {value === "ree" ? <StarIcon sx={{ fontSize: 40 }} /> : value}
        </Avatar>
      ) : (
        <Typography
          level="h4"
          sx={{
            fontSize: "24px",
            fontWeight: isMarkable && !marked ? "bold" : "normal",
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
  const [spots, setSpots] = useState(board.spots);
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
          }}
        >
          {spots.map(({ value, marked }, i) => (
            <Cell
              key={i}
              index={i}
              text={value}
              marked={marked}
              isMarkable={history?.slice(0, -1).includes(value)}
              onClick={handleClick}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
