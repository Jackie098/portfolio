import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-press-start text-5xl text-accent retro-glow">404</p>
      <h1 className="font-press-start text-base leading-relaxed text-primary">
        Game Over
      </h1>
      <p className="text-sm text-muted-foreground">
        Essa tela não existe. Volte ao início e continue a jornada.
      </p>
      <Button asChild variant="primary">
        <Link href="/">Continue</Link>
      </Button>
    </main>
  );
}
