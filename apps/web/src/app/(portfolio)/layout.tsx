import Navbar from "@/app/(portfolio)/components/nav-bar";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className="p-5 max-w-6xl mx-auto">{children}</div>
    </main>
  );
}
