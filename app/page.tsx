import Link from "next/link";
import { Gamepad } from "pixelarticons/react";

import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/ui/typing-text";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="absolute right-6 top-6 flex items-center gap-2">
        <SoundToggle />
        <ThemeToggle />
      </div>

      <Gamepad width={72} height={72} className="text-accent pulse-neon" aria-hidden />

      <h1 className="font-press-start text-2xl leading-relaxed text-primary neon-sign sm:text-3xl">
        Carlos Augusto
      </h1>

      <p className="font-press-start text-xs text-success">
        <TypingText text="> retro design system" />
      </p>

      <p className="max-w-md text-sm text-muted-foreground">
        Sistema de design com estética retro game / neon: tipografia, botões,
        cards, inputs, barras de progresso e efeitos animados.
      </p>

      <Button asChild variant="primary" size="lg">
        <Link href="/design-system">View Design System</Link>
      </Button>
    </main>
  );
}
