import * as React from "react";

import { cn } from "@/lib/utils";

type TypingTextProps = React.ComponentProps<"span"> & {
  text: string;
  /** Segundos por caractere. */
  speed?: number;
  /** Cursor piscando no fim da linha. */
  caret?: boolean;
};

/**
 * Revela o texto como se estivesse sendo digitado.
 *
 * O texto completo fica no DOM desde o primeiro frame — a animação
 * é só uma máscara CSS — então leitores de tela nunca recebem
 * conteúdo parcial.
 */
function TypingText({
  className,
  text,
  speed = 0.06,
  caret = true,
  style,
  ...props
}: TypingTextProps) {
  return (
    <span
      className={cn(
        "typing align-bottom",
        caret && "terminal-cursor",
        className,
      )}
      style={
        {
          "--typing-steps": text.length,
          "--typing-duration": `${(text.length * speed).toFixed(2)}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {text}
    </span>
  );
}

export { TypingText };
export type { TypingTextProps };
