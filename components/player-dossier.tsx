"use client";

import { Close, Gamepad } from "pixelarticons/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerDossierProps = {
  children: React.ReactNode;
};

export function PlayerDossier({ children }: PlayerDossierProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-6">
        <Button
          ref={triggerRef}
          type="button"
          variant="accent"
          size="lg"
          className={cn("pointer-events-auto bg-card", open && "invisible")}
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <Gamepad width={24} height={24} aria-hidden />
          Conheça o jogador
        </Button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-60 flex items-end justify-center p-4 pb-24">
          <button
            type="button"
            className="absolute inset-0 bg-background/80"
            aria-label="Fechar ficha do jogador"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="sheet-up relative z-10 flex w-full max-w-md flex-col gap-2"
          >
            <div className="flex justify-end">
              <Button
                ref={closeRef}
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Fechar ficha do jogador"
                onClick={() => setOpen(false)}
              >
                <Close width={24} height={24} aria-hidden />
              </Button>
            </div>
            <p id={titleId} className="sr-only">
              Ficha do jogador
            </p>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
