import Providers from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jenesh | Portfolio",
  description:
    "Portfolio of Jenesh Pradhananga - Full Stack Developer specializing in modern web applications, and scalable backend solutions.",
  keywords: [
    "Jemy Jenesh",
    "Jenesh",
    "Jenesh Pradhananga",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Software Engineer",
  ],
  authors: [{ name: "Jemy Jenesh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
