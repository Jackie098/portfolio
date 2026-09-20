"use client";

import { Volume3, VolumeX } from "pixelarticons/react";

import { useRetroSound } from "@/components/sound-provider";
import { Button } from "@/components/ui/button";

export function SoundToggle() {
  const { enabled, setEnabled, play } = useRetroSound();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-pressed={enabled}
      aria-label={enabled ? "Desativar sons" : "Ativar sons"}
      onClick={() => {
        const next = !enabled;
        setEnabled(next);
        if (next) play("click");
      }}
    >
      {enabled ? (
        <Volume3 width={24} height={24} aria-hidden />
      ) : (
        <VolumeX width={24} height={24} aria-hidden />
      )}
    </Button>
  );
}
