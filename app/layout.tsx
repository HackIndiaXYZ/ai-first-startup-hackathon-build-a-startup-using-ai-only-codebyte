import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://pitchpilot.vercel.app"),
  title: "PitchPilot — AI Co-founder for Solo Founders",
  description:
    "Autonomous 4-agent pipeline turning raw startup ideas into validation one-pagers, 10-slide decks, live landing pages, and MVP specs in under 90 seconds.",
  keywords: ["AI co-founder", "startup validation", "pitch deck generator", "MVP spec", "Vercel design"],
  authors: [{ name: "Team CodeByte" }],
  openGraph: {
    title: "PitchPilot — AI Co-founder for Solo Founders",
    description:
      "Autonomous 4-agent pipeline turning raw startup ideas into validation one-pagers, 10-slide decks, live landing pages, and MVP specs in under 90 seconds.",
    siteName: "PitchPilot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchPilot — AI Co-founder for Solo Founders",
    description:
      "Autonomous 4-agent pipeline turning raw startup ideas into validation one-pagers, 10-slide decks, live landing pages, and MVP specs in under 90 seconds.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
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
        className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
