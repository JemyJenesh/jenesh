import { Drawer } from "@mui/joy";
import { PropsWithChildren } from "react";

import Box from "@mui/joy/Box";
import FormLabel from "@mui/joy/FormLabel";

export function ColorModal({
  open,
  children,
}: PropsWithChildren<{ open: boolean }>) {
  return (
    <Drawer anchor={"top"} open={open}>
      {children}
    </Drawer>
  );
}

export function ColorList({
  onSelectColor,
}: {
  onSelectColor: (color: string) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
      }}
    >
      <FormLabel
        id="wildcard-color"
        sx={{
          mb: 2,
          fontWeight: "xl",
          textTransform: "uppercase",
        }}
      >
        Choose a color for your wildcard
      </FormLabel>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{ height: 80, width: 80, cursor: "pointer", bgcolor: "#3298DC" }}
          onClick={() => onSelectColor("blue")}
        />
        <Box
          sx={{ height: 80, width: 80, cursor: "pointer", bgcolor: "#EA473C" }}
          onClick={() => onSelectColor("red")}
        />
        <Box
          sx={{ height: 80, width: 80, cursor: "pointer", bgcolor: "#4F984C" }}
          onClick={() => onSelectColor("green")}
        />
        <Box
          sx={{
            height: 80,
            width: 80,
            cursor: "pointer",
            backgroundColor: "#fac728",
          }}
          onClick={() => onSelectColor("yellow")}
        />
      </Box>
    </Box>
  );
}
