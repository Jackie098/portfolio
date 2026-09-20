import type { Metadata } from "next";
import { Orbitron, Press_Start_2P } from "next/font/google";

import { RetroCursor } from "@/components/retro-cursor";
import { SelectionRandomizer } from "@/components/selection-randomizer";
import { SoundProvider } from "@/components/sound-provider";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start-2p",
  display: "swap",
  weight: "400",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Carlos Augusto — Design System",
    template: "%s — Carlos Augusto",
  },
  description: "Design system retro game / neon.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${pressStart2P.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-orbitron text-foreground">
        <ThemeProvider>
          <SoundProvider>
            {children}
            <RetroCursor />
            <SelectionRandomizer />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
