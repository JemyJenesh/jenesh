import { Router } from "@/components/Router";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAppStore } from "./store";

const queryClient = new QueryClient();

function App() {
  const fetchPlayer = useAppStore((state) => state.fetchPlayer);

  useEffect(() => {
    fetchPlayer();
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
