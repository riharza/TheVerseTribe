import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import { SiteBackground } from "@/components/carousel/SiteBackground";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-plex-serif",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "The Verse Tribe — Research Software & AI Platform",
    template: "%s | The Verse Tribe",
  },
  description:
    "Discover, organize, and analyze scientific literature with evidence-grounded AI and reproducible experiment workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
        <AppProviders>
          <SiteBackground />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
