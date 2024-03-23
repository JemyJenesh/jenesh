import { useAppStore } from "@/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const player = useAppStore((state) => state.player);

  if (!player) {
    const pathname = window.location.pathname;
    return <Navigate to={`/players/create?r=${pathname}`} />;
  }

  return children;
}
