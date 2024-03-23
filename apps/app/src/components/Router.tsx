import { Home, NotFoundPage, PlayerCreate } from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from ".";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players/create" element={<PlayerCreate />} />
        <Route
          path="/secret"
          element={
            <PrivateRoute>
              <p>Secret</p>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
