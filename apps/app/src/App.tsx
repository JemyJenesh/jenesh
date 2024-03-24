import { Router } from "@/components/Router";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { PlayerContextProvider } from "./store";

const queryClient = new QueryClient();

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <PlayerContextProvider>
          <Router />
        </PlayerContextProvider>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
