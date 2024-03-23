import { Router } from "@/components/Router";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { useEffect } from "react";
import { useAppStore } from "./store";

function App() {
  const fetchPlayer = useAppStore((state) => state.fetchPlayer);

  useEffect(() => {
    fetchPlayer();
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Router />
    </CssVarsProvider>
  );
}

export default App;
