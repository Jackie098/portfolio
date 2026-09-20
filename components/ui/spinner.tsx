import { Loading } from "pixelarticons/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type SpinnerProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** Múltiplo de 24 para os pixels ficarem nítidos. */
  size?: 24 | 48 | 72;
  label?: string;
};

function Spinner({
  className,
  size = 24,
  label = "Carregando",
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-3 text-primary", className)}
      {...props}
    >
      <Loading width={size} height={size} className="spin-steps" aria-hidden />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Spinner };
export type { SpinnerProps };
