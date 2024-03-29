import {
  Bingo,
  BingoRoom,
  Home,
  NotFoundPage,
  PlayerCreate,
  UnoRoom,
} from "@/pages";
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
        <Route
          path="/bingos/:id"
          element={
            <PrivateRoute>
              <Bingo />
            </PrivateRoute>
          }
        />
        <Route
          path="/unos/:id/room"
          element={
            <PrivateRoute>
              <UnoRoom />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
