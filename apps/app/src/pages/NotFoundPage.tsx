import { Box, Button, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography level="h1">Page not found</Typography>
      <Typography gutterBottom>
        The page you are looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
}
