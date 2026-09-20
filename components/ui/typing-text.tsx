"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TypingPhase = "type" | "hold" | "erase" | "empty";

type TypingTextProps = React.ComponentProps<"span"> & {
  text: string;
  /** Segundos por caractere na digitação. */
  speed?: number;
  /** Cursor piscando no fim da linha. */
  caret?: boolean;
  /** Depois de completar, espera e reescreve. */
  loop?: boolean;
  /** Pausa com o texto completo, em segundos. */
  hold?: number;
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
  loop = true,
  hold = 2.5,
  style,
  ...props
}: TypingTextProps) {
  const [phase, setPhase] = React.useState<TypingPhase>("type");
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (reduceMotion || !loop) return;
    if (phase === "hold") {
      const id = window.setTimeout(() => setPhase("erase"), hold * 1000);
      return () => window.clearTimeout(id);
    }
    if (phase === "empty") {
      const id = window.setTimeout(() => setPhase("type"), 400);
      return () => window.clearTimeout(id);
    }
  }, [hold, loop, phase, reduceMotion]);

  const typeDuration = text.length * speed;
  const eraseDuration = text.length * speed * 0.45;

  const onAnimationEnd = (event: React.AnimationEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.animationName === "typing-reveal" && loop && !reduceMotion) {
      setPhase("hold");
      return;
    }
    if (event.animationName === "typing-erase") {
      setPhase("empty");
    }
  };

  return (
    <span
      className={cn(
        "typing align-bottom",
        !reduceMotion && phase === "type" && "typing-in",
        !reduceMotion && phase === "hold" && "typing-hold",
        !reduceMotion && phase === "erase" && "typing-out",
        !reduceMotion && phase === "empty" && "typing-empty",
        caret && "terminal-cursor",
        className,
      )}
      style={
        {
          "--typing-steps": text.length,
          "--typing-duration": `${typeDuration.toFixed(2)}s`,
          "--typing-erase-duration": `${eraseDuration.toFixed(2)}s`,
          ...style,
        } as React.CSSProperties
      }
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      {text}
    </span>
  );
}

export { TypingText };
export type { TypingTextProps };
