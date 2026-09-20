"use client";

import { ChevronLeft, ChevronRight, Code } from "pixelarticons/react";
import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TechItem {
  id: string;
  name: string;
  /**
   * Any React node: pixelarticon, inline SVG, <img>, Next <Image>, etc.
   * Falls back to a generic Code icon when omitted.
   */
  icon?: React.ReactNode;
}

export interface RetroSliderProps {
  items: TechItem[];
  /**
   * Total seconds to complete one full loop.
   * Defaults to items.length × 2.5, minimum 10 s.
   */
  duration?: number;
  /**
   * Show ◀ / PAUSE / ▶ controls bar.
   * @default true
   */
  controls?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  TechCard                                                            */
/* ------------------------------------------------------------------ */

function TechCard({ name, icon }: Omit<TechItem, "id">) {
  return (
    <div
      className={cn(
        "flex w-20 shrink-0 flex-col items-center gap-2 px-2 py-3",
        "pixel-corners [--pixel-step:2px]",
        "border-2 border-border bg-card",
        "transition-[border-color,filter] duration-150",
        "hover:border-primary",
        "hover:filter-[drop-shadow(0_0_8px_color-mix(in_srgb,var(--primary)_50%,transparent))]",
      )}
    >
      {/* 48 × 48 icon slot */}
      <span
        className="flex h-12 w-12 items-center justify-center text-primary"
        aria-hidden
      >
        {icon ?? <Code width={24} height={24} aria-hidden />}
      </span>

      {/* Label */}
      <span className="w-full truncate text-center font-press-start text-[0.4rem] leading-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ControlButton                                                       */
/* ------------------------------------------------------------------ */

function ControlButton({
  label,
  onClick,
  active,
  children,
  className,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "pixel-btn pixel-corners [--pixel-step:2px]",
        "flex h-8 items-center justify-center px-2",
        "border-2 bg-card font-press-start text-[0.4rem]",
        active
          ? "border-primary text-primary"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary",
        "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ring)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  RetroSlider                                                         */
/* ------------------------------------------------------------------ */

export function RetroSlider({
  items,
  duration,
  controls = true,
  className,
}: RetroSliderProps) {
  const resolvedDuration = duration ?? Math.max(items.length * 2.5, 10);

  const [paused, setPaused] = React.useState(false);
  const [dir, setDir] = React.useState<"forward" | "reverse">("forward");

  // Duplicate the list once — the animation moves exactly -50% (one copy).
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("relative flex flex-col gap-3", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ── Left fade mask ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent"
      />
      {/* ── Right fade mask ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent"
      />

      {/* ── Track ── */}
      <div className="overflow-hidden">
        {/* Accessible item list — the duplicated track is aria-hidden */}
        <p className="sr-only">
          Tecnologias: {items.map((t) => t.name).join(", ")}
        </p>

        <ul
          className="marquee-track flex w-max gap-3 py-1"
          data-paused={paused ? "true" : undefined}
          data-dir={dir === "reverse" ? "reverse" : undefined}
          aria-hidden
          style={
            {
              "--marquee-duration": `${resolvedDuration}s`,
            } as React.CSSProperties
          }
        >
          {doubled.map((item, i) => (
            <li key={`${item.id}-${i}`}>
              <TechCard name={item.name} icon={item.icon} />
            </li>
          ))}
        </ul>
      </div>

      {/* ── Controls ── */}
      {controls && (
        <div className="flex items-center justify-center gap-2">
          {/* ◀ Reverse */}
          <ControlButton
            label="Rolar para a esquerda"
            active={dir === "reverse"}
            onClick={() => {
              setDir("reverse");
              setPaused(false);
            }}
          >
            <ChevronLeft width={24} height={24} aria-hidden />
          </ControlButton>

          {/* Pause / Play */}
          <ControlButton
            label={paused ? "Retomar animação" : "Pausar animação"}
            active={paused}
            onClick={() => setPaused((p) => !p)}
            className="w-20"
          >
            {paused ? "▶ PLAY" : "⏸ PAUSE"}
          </ControlButton>

          {/* ▶ Forward */}
          <ControlButton
            label="Rolar para a direita"
            active={dir === "forward"}
            onClick={() => {
              setDir("forward");
              setPaused(false);
            }}
          >
            <ChevronRight width={24} height={24} aria-hidden />
          </ControlButton>
        </div>
      )}
    </div>
  );
}
