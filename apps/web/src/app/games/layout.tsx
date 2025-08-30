import Navbar from "@/app/games/components/nav-bar";
import PlayerModal from "@/app/games/components/player-modal";
import { PlayerProvider } from "@/app/games/components/player-provider";
import { axiosInstance } from "@/lib/axios";
import type { Player } from "@/schema/player";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jenesh | Games",
  description: "Games made by Jenesh Pradhananga",
  keywords: ["Jen games", "Games by Jenesh", "Games from Jenesh"],
  authors: [{ name: "Jemy Jenesh" }],
};

async function getData() {
  try {
    const response = await axiosInstance<Player | null>("/api/players/me");

    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const player = await getData();

  return (
    <main>
      <PlayerProvider initialPlayer={player}>
        <Navbar />
        <div className="p-5 max-w-6xl mx-auto">{children}</div>
        <PlayerModal />
      </PlayerProvider>
    </main>
  );
}
