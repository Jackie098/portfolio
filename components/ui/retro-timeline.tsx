import { BookOpen, Briefcase, Code, Trophy } from "pixelarticons/react";
import * as React from "react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type TimelineType = "work" | "edu" | "project" | "achievement";

export interface TimelineEntry {
  id: string;
  /** Four-digit year, e.g. "2024" or "2020–2022" */
  year: string;
  title: string;
  org?: string;
  description?: string;
  tags?: string[];
  type?: TimelineType;
  /** Marks this as the active/present entry — shows "NOW" badge and pulses. */
  current?: boolean;
}

export interface RetroTimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                              */
/* ------------------------------------------------------------------ */

const typeMap = {
  work: {
    colorClass: "text-primary",
    dotClass: "bg-primary",
    Icon: Briefcase,
  },
  edu: {
    colorClass: "text-secondary",
    dotClass: "bg-secondary",
    Icon: BookOpen,
  },
  project: {
    colorClass: "text-accent",
    dotClass: "bg-accent",
    Icon: Code,
  },
  achievement: {
    colorClass: "text-success",
    dotClass: "bg-success",
    Icon: Trophy,
  },
} satisfies Record<
  TimelineType,
  {
    colorClass: string;
    dotClass: string;
    Icon: React.ComponentType<{
      width: number;
      height: number;
      className?: string;
      "aria-hidden"?: boolean;
    }>;
  }
>;

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export function RetroTimeline({ entries, className }: RetroTimelineProps) {
  return (
    <ol className={cn("space-y-0", className)}>
      {entries.map((entry, i) => {
        const cfg = typeMap[entry.type ?? "work"];
        const isLast = i === entries.length - 1;

        return (
          <li key={entry.id} className="flex items-stretch">
            {/* ── Year column ── */}
            <div className="flex w-16 shrink-0 flex-col items-end sm:w-20">
              <span
                className={cn(
                  "mt-3.25 pr-3 font-press-start text-[0.45rem] leading-none",
                  cfg.colorClass,
                )}
              >
                {entry.year}
              </span>
            </div>

            {/* ── Connector column ── */}
            <div className="flex w-5 shrink-0 flex-col items-center">
              {/* Node — small pixel square */}
              <div
                aria-hidden
                className={cn(
                  "mt-3 h-3 w-3 shrink-0 [--pixel-step:1px] pixel-corners",
                  cfg.dotClass,
                  entry.current && "pulse-neon",
                )}
              />
              {/* Dashed line connecting to next item */}
              {!isLast && (
                <div
                  aria-hidden
                  className="mt-1 w-px flex-1"
                  style={{
                    background:
                      "repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 5px, transparent 5px, transparent 9px)",
                  }}
                />
              )}
            </div>

            {/* ── Content ── */}
            <div className={cn("min-w-0 flex-1 pl-4", !isLast && "pb-8")}>
              {/* Title row */}
              <div className="flex flex-wrap items-center gap-2">
                <cfg.Icon
                  width={12}
                  height={12}
                  className={cn("shrink-0", cfg.colorClass)}
                  aria-hidden
                />
                <span
                  className={cn(
                    "font-press-start text-[0.6rem] leading-tight",
                    cfg.colorClass,
                    entry.current && "retro-glow",
                  )}
                >
                  {entry.title}
                </span>
                {entry.current && (
                  <span className="font-press-start text-[0.45rem] text-success border border-success px-1 py-0.5 [--pixel-step:1px] pixel-corners">
                    NOW
                  </span>
                )}
              </div>

              {/* Org / institution */}
              {entry.org && (
                <p className="mt-1 text-xs text-muted-foreground">{entry.org}</p>
              )}

              {/* Description */}
              {entry.description && (
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {entry.description}
                </p>
              )}

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-press-start text-[0.45rem] text-muted-foreground border border-border px-1.5 py-0.5 [--pixel-step:1px] pixel-corners"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
