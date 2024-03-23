import { useAppStore } from "@/store";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Stack,
  Typography,
  radioClasses,
} from "@mui/joy";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

let avatars: string[] = [];

for (let i = 1; i <= 20; i++) {
  avatars.push(`/static/avatars/boys/${i}.png`);
}
for (let i = 1; i <= 20; i++) {
  avatars.push(`/static/avatars/girls/${i}.png`);
}

export function PlayerCreate() {
  const player = useAppStore((state) => state.player);
  const loading = useAppStore((state) => state.isCreating);
  const createPlayer = useAppStore((state) => state.createPlayer);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    avatar: "",
  });
  const isDisabled = !form.name || !form.avatar;

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const redirect = () => {
      const redirect = searchParams.get("r");
      navigate(redirect ?? "/");
    };
    createPlayer(form, redirect);
  };

  if (player && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Stack
        sx={{
          width: "100%",
          py: 3,
          boxShadow: "xs",
          backgroundColor: "whitesmoke",
        }}
        direction="column"
        alignItems="center"
        spacing={3}
      >
        <Typography sx={{ width: 435 }} fontSize={"1.5rem"}>
          Create a profile
        </Typography>
        <Stack spacing={1} sx={{ width: 435 }}>
          <FormLabel>Enter your name</FormLabel>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            autoFocus
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Stack spacing={1}>
        <FormLabel>Select an avatar</FormLabel>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "sm",
            p: 1,
          }}
        >
          <RadioGroup
            overlay
            name="avatar"
            onChange={handleChange}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              flexDirection: "row",
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: "3px solid",
                  borderColor: "primary.500",
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  zIndex: 2,
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  bgcolor: "background.surface",
                  borderRadius: "50%",
                },
              },
            }}
          >
            {avatars.map((value) => (
              <Sheet
                key={value}
                variant="soft"
                sx={{
                  borderRadius: "100%",
                  boxShadow: "sm",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Radio
                  id={value}
                  value={value}
                  checkedIcon={<CheckCircleRoundedIcon />}
                />
                <Avatar
                  sx={{
                    "--Avatar-size": "75px",
                  }}
                  src={value}
                  size="lg"
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Sheet>
      </Stack>

      <Stack
        sx={{ width: 435 }}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
      >
        <Button onClick={handleSubmit} loading={loading} disabled={isDisabled}>
          Create
        </Button>
      </Stack>
    </Box>
  );
}
