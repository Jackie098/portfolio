"use client";

import Link from "next/link";
import { Close, Menu } from "pixelarticons/react";
import * as React from "react";

import { MusicPlayerWidget } from "@/components/music-player";
import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#xp", label: "XP" },
  { href: "#cases", label: "Cases" },
  { href: "#stack", label: "Stack" },
  { href: "#contato", label: "Contato" },
] as const;

const linkClassName =
  "font-press-start text-[0.45rem] text-muted-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-20 -mx-6 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-border bg-background/90 px-6 py-3 backdrop-blur-sm max-md:hidden">
        <nav aria-label="Seções" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={linkClassName}>
              {item.label}
            </a>
          ))}
          <Button asChild variant="ghost" size="sm">
            <Link href="/design-system">Design System</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle />
        </div>
      </header>

      <div ref={rootRef} className="fixed inset-x-6 top-3 z-40 md:hidden">
        <Card className="gap-2 p-2">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <Close width={24} height={24} aria-hidden />
              ) : (
                <Menu width={24} height={24} aria-hidden />
              )}
            </Button>
            <SoundToggle />
            <ThemeToggle />
            <div className="relative ml-auto min-h-17 min-w-0 flex-1">
              <MusicPlayerWidget fixed={false} dock />
            </div>
          </div>
        </Card>

        {open ? (
          <Card id={panelId} className="relative z-40 mt-2 gap-3 p-4">
            <nav aria-label="Seções" className="flex flex-col items-start gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={linkClassName}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild variant="ghost" size="sm">
                <Link href="/design-system" onClick={() => setOpen(false)}>
                  Design System
                </Link>
              </Button>
            </nav>
          </Card>
        ) : null}
      </div>
    </>
  );
}
