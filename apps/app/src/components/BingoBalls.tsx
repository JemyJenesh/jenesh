import { Box, CircularProgress, Stack, Typography } from "@mui/joy";
import { AnimatePresence, motion } from "framer-motion";

function Ball({
  highlight = false,
  text,
}: {
  highlight?: boolean;
  text: string;
}) {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        height: 75,
        width: 75,
        border: "2px solid gray",
        display: "grid",
        placeItems: "center",
        backgroundColor: highlight ? "#F1EAD7" : "inherit",
      }}
    >
      <Typography level="h4" sx={{ letterSpacing: "2px" }}>
        {text.toUpperCase()}
      </Typography>
    </Box>
  );
}

export function BingoBalls({
  history,
  progress,
}: {
  history: string[];
  progress: number;
}) {
  const historyTemp = [...history];
  const historyReverse = historyTemp.reverse();

  return (
    <Stack
      sx={{
        px: 1,
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", visibility: "hidden", gap: 1 }}>
        <Ball text={""} />
        <Ball text={""} />
        <Ball text={""} />
        <Ball text={""} />
      </Box>
      <CircularProgress
        sx={{ position: "relative", "--CircularProgress-size": "85px" }}
        determinate
        value={progress}
      >
        <AnimatePresence>
          <motion.div
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
            key={historyReverse[0] ?? "-"}
            initial={{
              opacity: 0,
              x: -75,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 75,
            }}
          >
            <Ball text={historyReverse[0] ?? "-"} highlight />
          </motion.div>
        </AnimatePresence>
      </CircularProgress>

      <AnimatePresence mode="popLayout">
        {historyReverse.slice(1, 5).map((value) => (
          <motion.div
            key={value + historyReverse.length}
            initial={{
              opacity: 0,
              x: -75,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 75,
            }}
          >
            <Ball text={value} />
          </motion.div>
        ))}
      </AnimatePresence>
      <Box sx={{ display: "flex", visibility: "hidden", gap: 1 }}>
        {[...new Array(4 - historyReverse.slice(1, 5).length)].map((_, i) => (
          <Ball key={i} text={""} />
        ))}
      </Box>
    </Stack>
  );
}
