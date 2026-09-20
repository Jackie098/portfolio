"use client";

import * as React from "react";

const COLOR_VARS = [
  "--primary",
  "--secondary",
  "--accent",
  "--success",
  "--warning",
] as const;

const MAX_PARTICLES = 72;
const AREA_PER_PARTICLE = 18_000;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
};

function readPalette(): string[] {
  const styles = getComputedStyle(document.documentElement);
  return COLOR_VARS.map((name) => styles.getPropertyValue(name).trim()).filter(
    Boolean,
  );
}

function spawn(width: number, height: number, palette: string[]): Particle {
  const color = palette[Math.floor(Math.random() * palette.length)] ?? palette[0];
  const size = [2, 3, 4][Math.floor(Math.random() * 3)] ?? 2;
  const speed = 0.12 + Math.random() * 0.28;
  const angle = Math.random() * Math.PI * 2;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size,
    color,
    alpha: 0.18 + Math.random() * 0.28,
  };
}

function paint(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);
  for (const particle of particles) {
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.fillRect(
      Math.round(particle.x),
      Math.round(particle.y),
      particle.size,
      particle.size,
    );
  }
  ctx.globalAlpha = 1;
}

/**
 * Campo de pixels à deriva nas cores da paleta semântica.
 * Desliga o loop sob prefers-reduced-motion (fica estático).
 */
export function ParticleField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: Particle[] = [];
    let palette = readPalette();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;

    const countFor = (w: number, h: number) =>
      Math.max(24, Math.min(MAX_PARTICLES, Math.floor((w * h) / AREA_PER_PARTICLE)));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countFor(width, height);
      palette = readPalette();
      while (particles.length < target) {
        particles.push(spawn(width, height, palette));
      }
      particles.length = target;
      for (const particle of particles) {
        particle.color =
          palette[Math.floor(Math.random() * palette.length)] ?? particle.color;
      }
      paint(ctx, particles, width, height);
    };

    const tick = () => {
      if (!running) return;
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -particle.size) particle.x = width + particle.size;
        if (particle.x > width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = height + particle.size;
        if (particle.y > height + particle.size) particle.y = -particle.size;
      }
      paint(ctx, particles, width, height);
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const start = () => {
      if (reduced.matches || document.hidden) {
        stop();
        paint(ctx, particles, width, height);
        return;
      }
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const onTheme = () => {
      palette = readPalette();
      for (let i = 0; i < particles.length; i++) {
        const next = palette[i % palette.length];
        if (next) particles[i].color = next;
      }
      paint(ctx, particles, width, height);
    };

    resize();
    start();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", start);
    reduced.addEventListener("change", start);

    const themeWatch = new MutationObserver(onTheme);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", start);
      reduced.removeEventListener("change", start);
      themeWatch.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-field"
      aria-hidden
    />
  );
}
