import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "pixel-corners [--pixel-step:5px] [--card-accent:var(--primary)] [--card-frame:var(--border)] bg-card text-card-foreground shadow-[inset_0_0_0_2px_var(--card-frame)]",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "[--card-frame:color-mix(in_srgb,var(--primary)_35%,transparent)]",
        secondary:
          "[--card-accent:var(--secondary)] [--card-frame:color-mix(in_srgb,var(--secondary)_35%,transparent)]",
        accent:
          "[--card-accent:var(--accent)] [--card-frame:color-mix(in_srgb,var(--accent)_35%,transparent)]",
        danger:
          "[--card-accent:var(--destructive)] [--card-frame:color-mix(in_srgb,var(--destructive)_35%,transparent)]",
        warning:
          "[--card-accent:var(--warning)] [--card-frame:color-mix(in_srgb,var(--warning)_35%,transparent)]",
        success:
          "[--card-accent:var(--success)] [--card-frame:color-mix(in_srgb,var(--success)_35%,transparent)]",
        glow: "[--card-frame:color-mix(in_srgb,var(--primary)_35%,transparent)] [filter:drop-shadow(0_0_14px_color-mix(in_srgb,var(--primary)_40%,transparent))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant ?? "default"}
      className={cn(
        cardVariants({ variant }),
        "flex min-w-0 flex-col gap-4 p-5",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-press-start text-base leading-relaxed text-(--card-accent) retro-glow",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex min-w-0 flex-col gap-3 text-sm", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
