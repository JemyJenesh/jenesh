import { BingoRoom, Home, NotFoundPage, PlayerCreate } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from ".";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/players/create" element={<PlayerCreate />} />
        <Route
          path="/bingos/:id/room"
          element={
            <PrivateRoute>
              <BingoRoom />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
