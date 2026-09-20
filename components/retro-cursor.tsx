"use client";

import * as React from "react";

const INTERACTIVE = 'a, button, summary, select, [role="button"], input, textarea';

/**
 * Anel pixelado que acompanha o ponteiro, puramente decorativo:
 * o cursor nativo (pixel art, definido em globals.css) continua
 * visível. Desliga em ponteiro grosso e sob redução de movimento.
 */
export function RetroCursor() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setActive(!coarse.matches && !reduced.matches);
    sync();

    coarse.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  React.useEffect(() => {
    if (!active) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let hovering = false;
    let tone = "";

    let seen = false;

    const onMove = (event: PointerEvent) => {
      if (!seen) {
        // Evita o rastro aparecer parado no canto antes do primeiro movimento.
        seen = true;
        current.x = event.clientX;
        current.y = event.clientY;
        ref.current?.setAttribute("data-ready", "true");
      }
      target.x = event.clientX;
      target.y = event.clientY;
      const raw = event.target;
      const hoverEl =
        raw instanceof Element ? raw.closest(INTERACTIVE) : null;
      hovering = Boolean(hoverEl);
      tone =
        hoverEl instanceof Element
          ? (hoverEl.closest("[data-cursor-trail]")?.getAttribute(
              "data-cursor-trail",
            ) ?? "")
          : "";
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;

      const node = ref.current;
      if (node) {
        const scale = hovering ? 1.6 : 1;
        if (tone) node.dataset.tone = tone;
        else delete node.dataset.tone;
        node.style.transform = `translate3d(${Math.round(current.x) - 6}px, ${
          Math.round(current.y) - 6
        }px, 0) scale(${scale})`;
      }

      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, [active]);

  if (!active) return null;

  return <div ref={ref} className="cursor-trail" aria-hidden />;
}
