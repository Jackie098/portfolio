"use client";

import * as React from "react";

const STORAGE_KEY = "retro-sound-enabled";

type RetroSound = "hover" | "click";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
  play: (sound: RetroSound) => void;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

/**
 * A preferência mora no localStorage, que é externo ao React.
 * useSyncExternalStore evita ler no efeito e mantém abas em sincronia.
 */
let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange];
  window.addEventListener("storage", onChange);
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

/** No servidor o som é sempre mudo — nunca autoplay. */
function getServerSnapshot() {
  return false;
}

function writeEnabled(value: boolean) {
  window.localStorage.setItem(STORAGE_KEY, String(value));
  listeners.forEach((listener) => listener());
}

/**
 * Timbres 8-bit gerados por oscilador. `hover` é curto e agudo
 * (troca de opção); `click` é mais grave e em duas notas (confirmação).
 */
const RECIPES: Record<RetroSound, { freq: number; to: number; duration: number; gain: number }> = {
  hover: { freq: 880, to: 1320, duration: 0.045, gain: 0.04 },
  click: { freq: 320, to: 160, duration: 0.11, gain: 0.07 },
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const enabled = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const contextRef = React.useRef<AudioContext | null>(null);

  const setEnabled = React.useCallback((value: boolean) => {
    writeEnabled(value);
  }, []);

  const toggle = React.useCallback(() => {
    writeEnabled(!enabled);
  }, [enabled]);

  const play = React.useCallback(
    (sound: RetroSound) => {
      if (!enabled) return;

      // AudioContext só pode nascer depois de um gesto do usuário.
      const ctx =
        contextRef.current ??
        (contextRef.current = new window.AudioContext());
      if (ctx.state === "suspended") void ctx.resume();

      const { freq, to, duration, gain } = RECIPES[sound];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(to, now + duration);

      const amp = ctx.createGain();
      amp.gain.setValueAtTime(gain, now);
      amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(amp).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    },
    [enabled],
  );

  const value = React.useMemo(
    () => ({ enabled, setEnabled, toggle, play }),
    [enabled, setEnabled, toggle, play],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

/**
 * Seguro fora do provider: devolve no-ops para que componentes
 * de UI possam emitir som sem depender dele.
 */
export function useRetroSound(): SoundContextValue {
  return (
    React.useContext(SoundContext) ?? {
      enabled: false,
      setEnabled: () => {},
      toggle: () => {},
      play: () => {},
    }
  );
}

export type { RetroSound };
