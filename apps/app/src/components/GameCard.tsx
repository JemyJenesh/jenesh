import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

export function GameCard({
  title,
  isLoading = false,
  handleClick,
  img,
  isAvailable = true,
}: {
  title: string;
  isLoading: boolean;
  handleClick: () => void;
  img?: string;
  isAvailable?: boolean;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
        opacity: isAvailable ? 1 : 0.5,
      }}
    >
      {img && (
        <CardOverflow>
          <AspectRatio>
            <img src={img} alt={title} />
          </AspectRatio>
        </CardOverflow>
      )}
      <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
        <Typography level="body-lg">{title}</Typography>
        <Button
          sx={{ ml: "auto", alignSelf: "center" }}
          loading={isLoading}
          disabled={!isAvailable || isLoading}
          onClick={handleClick}
        >
          Play
        </Button>
      </CardContent>
    </Card>
  );
}
