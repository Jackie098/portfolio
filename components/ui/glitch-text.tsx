import * as React from "react";

import { cn } from "@/lib/utils";

type GlitchTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
};

/**
 * Texto com deslocamento RGB.
 *
 * As camadas coloridas são spans reais marcados com aria-hidden — e não
 * conteúdo gerado por CSS — para que o texto seja anunciado uma única vez.
 */
function GlitchText({ className, text, ...props }: GlitchTextProps) {
  return (
    <span className={cn("glitch", className)} {...props}>
      <span className="relative">{text}</span>
      <span className="glitch-layer glitch-layer-a" aria-hidden>
        {text}
      </span>
      <span className="glitch-layer glitch-layer-b" aria-hidden>
        {text}
      </span>
    </span>
  );
}

export { GlitchText };
export type { GlitchTextProps };
