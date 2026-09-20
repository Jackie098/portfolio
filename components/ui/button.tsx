"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { useRetroSound } from "@/components/sound-provider";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "pixel-corners pixel-btn inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 font-press-start uppercase tracking-wide focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "[--pixel-accent:var(--primary)] border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "[--pixel-accent:var(--secondary)] border-secondary bg-transparent text-secondary hover:bg-secondary hover:text-secondary-foreground",
        accent:
          "[--pixel-accent:var(--accent)] border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
        danger:
          "[--pixel-accent:var(--destructive)] border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground",
        warning:
          "[--pixel-accent:var(--warning)] border-warning bg-transparent text-warning hover:bg-warning hover:text-warning-foreground",
        success:
          "[--pixel-accent:var(--success)] border-success bg-transparent text-success hover:bg-success hover:text-success-foreground",
        outline:
          "[--pixel-accent:var(--border)] border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
        ghost:
          "[--pixel-accent:transparent] border-transparent bg-transparent text-foreground hover:text-primary",
      },
      size: {
        sm: "h-9 px-3 text-[0.5rem] [&_svg]:size-3",
        md: "h-11 px-5 text-[0.625rem] [&_svg]:size-3",
        lg: "h-14 px-7 text-xs [&_svg]:size-6",
        icon: "size-11 p-0 text-[0.625rem] [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Desliga o feedback sonoro deste botão. */
    silent?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  silent = false,
  onClick,
  onPointerEnter,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const { play } = useRetroSound();

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onPointerEnter={(event: React.PointerEvent<HTMLButtonElement>) => {
        // Toque não tem hover: evita disparar o blip de navegação.
        if (!silent && event.pointerType !== "touch") play("hover");
        onPointerEnter?.(event);
      }}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (!silent) play("click");
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
