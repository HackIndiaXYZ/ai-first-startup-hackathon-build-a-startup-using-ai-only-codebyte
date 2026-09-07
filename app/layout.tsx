import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PitchPilot — AI Co-founder for Solo Founders",
  description:
    "Autonomous 4-agent pipeline turning raw startup ideas into validation one-pagers, 10-slide decks, live landing pages, and MVP specs in under 90 seconds.",
  keywords: ["AI co-founder", "startup validation", "pitch deck generator", "MVP spec", "Vercel design"],
  authors: [{ name: "Team CodeByte" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sansFont.variable} ${monoFont.variable} min-h-screen bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
