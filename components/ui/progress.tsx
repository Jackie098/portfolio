import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A cor da variante vira uma CSS var no elemento raiz: o preenchimento
 * a usa como fundo e o glow é aplicado por fora da trilha, já que o
 * clip-path dos cantos pixelados recortaria qualquer sombra interna.
 */
const progressVariants = cva("", {
  variants: {
    variant: {
      primary: "[--progress-accent:var(--primary)]",
      secondary: "[--progress-accent:var(--secondary)]",
      accent: "[--progress-accent:var(--accent)]",
      health: "[--progress-accent:var(--destructive)]",
      mana: "[--progress-accent:var(--primary)]",
      exp: "[--progress-accent:var(--success)]",
      warning: "[--progress-accent:var(--warning)]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ProgressProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof progressVariants> & {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
  };

function Progress({
  className,
  variant,
  value,
  max = 100,
  label,
  showValue = false,
  ...props
}: ProgressProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = Math.round((clamped / max) * 100);

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        progressVariants({ variant }),
        className,
      )}
      {...props}
    >
      {(label || showValue) && (
        <div className="flex items-baseline justify-between font-press-start text-[0.625rem] uppercase tracking-wide">
          {label ? <span className="text-foreground">{label}</span> : <span />}
          {showValue ? (
            <span className="text-muted-foreground">{percent}%</span>
          ) : null}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="pixel-corners [--pixel-step:2px] h-3 w-full overflow-hidden border-2 border-border bg-muted [filter:drop-shadow(0_0_6px_color-mix(in_srgb,var(--progress-accent)_20%,transparent))]"
      >
        <div
          className="h-full bg-[var(--progress-accent)] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export { Progress, progressVariants };
export type { ProgressProps };
