import Navbar from "@/app/games/components/nav-bar";
import PlayerModal from "@/app/games/components/player-modal";
import { PlayerProvider } from "@/app/games/components/player-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jenesh | Games",
  description: "Games made by Jenesh Pradhananga",
  keywords: ["Jen games", "Games by Jenesh", "Games from Jenesh"],
  authors: [{ name: "Jemy Jenesh" }],
};

export default async function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <PlayerProvider>
        <Navbar />
        <div className="p-5 max-w-6xl mx-auto">{children}</div>
        <PlayerModal />
      </PlayerProvider>
    </main>
  );
}
