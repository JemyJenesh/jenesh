import { usePlayer, usePlayerCreate } from "@/store";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Stack,
  Typography,
  radioClasses,
} from "@mui/joy";
import { useState } from "react";
import { Navigate } from "react-router-dom";

let avatars: string[] = [];

for (let i = 1; i <= 20; i++) {
  avatars.push(`/static/avatars/boys/${i}.png`);
}
for (let i = 1; i <= 20; i++) {
  avatars.push(`/static/avatars/girls/${i}.png`);
}

export function PlayerCreate() {
  const { player } = usePlayer();
  const { mutate, isLoading } = usePlayerCreate();
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
    mutate(form);
  };

  if (player && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid xs={0} lg={4} />
      <Grid
        xs={12}
        lg={4}
        sx={{
          backgroundColor: "whitesmoke",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 3,
          }}
        >
          <Typography fontSize={"1.5rem"}>Create a profile</Typography>
          <Stack spacing={1}>
            <FormLabel>Enter your name</FormLabel>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              autoFocus
              variant="outlined"
            />
          </Stack>
        </Box>
      </Grid>
      <Grid xs={0} lg={4} />
      <Grid xs={0} lg={2} />
      <Grid xs={12} lg={8}>
        <Stack spacing={1} sx={{ p: 3 }}>
          <FormLabel>Select an avatar</FormLabel>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "sm",
              p: 1,
              overflow: "auto",
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
      </Grid>
      <Grid xs={0} lg={2} />

      <Grid xs={12} lg={4}>
        <Box sx={{ display: "flex", px: 3, justifyContent: "flex-end" }}>
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isDisabled}
          >
            Create
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
