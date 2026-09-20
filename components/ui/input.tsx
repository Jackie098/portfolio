"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  hint?: string;
  error?: string;
};

function Input({
  className,
  id,
  label,
  hint,
  error,
  disabled,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const invalid = Boolean(error);

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="font-press-start text-[0.625rem] uppercase tracking-wide text-muted-foreground"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        data-slot="input"
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        disabled={disabled}
        className={cn(
          "pixel-corners pixel-field h-11 w-full border-2 border-input bg-card px-3 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "transition-[filter] duration-150",
          "focus-visible:border-ring focus-visible:outline-none",
          "focus-visible:[filter:drop-shadow(0_0_8px_color-mix(in_srgb,var(--ring)_60%,transparent))]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          invalid &&
            "border-destructive [--ring:var(--destructive)] focus-visible:border-destructive",
          className,
        )}
        {...props}
      />

      {error ? (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export { Input };
export type { InputProps };
