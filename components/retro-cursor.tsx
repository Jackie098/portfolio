"use client";

import * as React from "react";

const INTERACTIVE = 'a, button, summary, select, [role="button"], input, textarea';

const LERP_LEAD = 0.28;
const LERP_SETTLE = 0.35;
const STILL_MS = 90;
const TAIL_SEC_MS = 55;
const TAIL_WARN_MS = 110;
const HISTORY_MS = 160;

type Point = { x: number; y: number; t: number };

function place(el: HTMLElement, x: number, y: number) {
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(var(--trail-scale, 1))`;
}

function sample(
  history: Point[],
  ago: number,
  now: number,
  fallback: { x: number; y: number },
) {
  const at = now - ago;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].t <= at) return history[i];
  }
  return history[0] ?? fallback;
}

/**
 * Anéis pixelados que acompanham o ponteiro, puramente decorativos:
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
    const lead = { x: 0, y: 0 };
    const sec = { x: 0, y: 0 };
    const warn = { x: 0, y: 0 };
    const history: Point[] = [];
    let lastMove = 0;
    let frame = 0;
    let hovering = false;
    let tone = "";
    let seen = false;

    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (!seen) {
        seen = true;
        lead.x = sec.x = warn.x = event.clientX;
        lead.y = sec.y = warn.y = event.clientY;
        ref.current?.setAttribute("data-ready", "true");
      }
      target.x = event.clientX;
      target.y = event.clientY;
      lastMove = now;
      history.push({ x: event.clientX, y: event.clientY, t: now });
      while (history.length > 1 && now - history[0].t > HISTORY_MS) {
        history.shift();
      }

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
      const now = performance.now();
      lead.x += (target.x - lead.x) * LERP_LEAD;
      lead.y += (target.y - lead.y) * LERP_LEAD;

      const still = now - lastMove > STILL_MS;

      if (still) {
        sec.x += (lead.x - sec.x) * LERP_SETTLE;
        sec.y += (lead.y - sec.y) * LERP_SETTLE;
        warn.x += (lead.x - warn.x) * LERP_SETTLE;
        warn.y += (lead.y - warn.y) * LERP_SETTLE;
      } else {
        const secAt = sample(history, TAIL_SEC_MS, now, lead);
        const warnAt = sample(history, TAIL_WARN_MS, now, secAt);
        sec.x += (secAt.x - sec.x) * 0.45;
        sec.y += (secAt.y - sec.y) * 0.45;
        warn.x += (warnAt.x - warn.x) * 0.35;
        warn.y += (warnAt.y - warn.y) * 0.35;
      }

      const node = ref.current;
      if (node) {
        node.style.setProperty("--trail-scale", hovering ? "1.6" : "1");
        if (tone) node.dataset.tone = tone;
        else delete node.dataset.tone;

        const [warnEl, secEl, leadEl] = node.children;
        if (
          warnEl instanceof HTMLElement &&
          secEl instanceof HTMLElement &&
          leadEl instanceof HTMLElement
        ) {
          place(warnEl, warn.x, warn.y);
          place(secEl, sec.x, sec.y);
          place(leadEl, lead.x, lead.y);
        }
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

  return (
    <div ref={ref} className="cursor-trail" aria-hidden>
      <span className="cursor-trail__sq cursor-trail__sq--warn" />
      <span className="cursor-trail__sq cursor-trail__sq--sec" />
      <span className="cursor-trail__sq cursor-trail__sq--lead" />
    </div>
  );
}
