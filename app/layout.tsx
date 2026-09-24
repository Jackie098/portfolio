import type { Metadata } from "next";
import { Orbitron, Press_Start_2P } from "next/font/google";

import { MusicPlayerWidget, MusicProvider } from "@/components/music-player";
import { ParticleField } from "@/components/particle-field";
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
    default: "Carlos Augusto — Portfólio",
    template: "%s — Carlos Augusto",
  },
  description:
    "Desenvolvedor Full Stack | Java · React · PostgreSQL. Serviços digitais e produto a partir de Teresina, PI.",
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
      <body className="min-h-full bg-background pb-28 font-orbitron text-foreground">
        <ThemeProvider>
          <SoundProvider>
            <MusicProvider>
              <ParticleField />
              <div className="relative z-10">{children}</div>
              <RetroCursor />
              <SelectionRandomizer />
              <MusicPlayerWidget className="max-md:hidden" />
            </MusicProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
