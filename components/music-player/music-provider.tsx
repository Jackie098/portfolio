"use client";

import * as React from "react";

import { TRACKS, type Track } from "@/components/music-player/tracks";
import { readStoredEnabled, useRetroSound } from "@/components/sound-provider";

export type { Track };

declare global {
  interface Window {
    __retroBgm?: HTMLAudioElement;
  }
}

/** Um único elemento — Strict Mode / HMR não podem criar segunda faixa. */
function getSharedAudio() {
  if (window.__retroBgm) return window.__retroBgm;
  const audio = new Audio();
  audio.preload = "auto";
  audio.loop = false;
  window.__retroBgm = audio;
  return audio;
}

const STORAGE_KEY = "retro-music-prefs";

export type RepeatMode = "none" | "one" | "all";

type Prefs = {
  currentIndex: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
};

type MusicContextValue = {
  tracks: Track[];
  currentTrack: Track;
  currentIndex: number;
  playing: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (percent: number) => void;
  setVolume: (value: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
};

const MusicContext = React.createContext<MusicContextValue | null>(null);

const FALLBACK_TRACK: Track = {
  id: "none",
  src: "",
  title: "—",
};

const SERVER_PREFS: Prefs = {
  currentIndex: 0,
  volume: 0.6,
  shuffle: false,
  repeat: "all",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parsePrefs(raw: string | null): Prefs | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    const currentIndex = clamp(Number(parsed.currentIndex) || 0, 0, TRACKS.length - 1);
    const volume = clamp(Number(parsed.volume ?? 0.6), 0, 1);
    const shuffle = Boolean(parsed.shuffle);
    const repeat: RepeatMode =
      parsed.repeat === "none" || parsed.repeat === "one" || parsed.repeat === "all"
        ? parsed.repeat
        : "all";
    return { currentIndex, volume, shuffle, repeat };
  } catch {
    return null;
  }
}

function pickRandom(except?: number) {
  if (TRACKS.length <= 1) return 0;
  let next = Math.floor(Math.random() * TRACKS.length);
  while (next === except) {
    next = Math.floor(Math.random() * TRACKS.length);
  }
  return next;
}

let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange];
  window.addEventListener("storage", onChange);
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
    window.removeEventListener("storage", onChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): string {
  return window.localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(SERVER_PREFS);
}

function getServerSnapshot(): string {
  return JSON.stringify(SERVER_PREFS);
}

function writePrefs(prefs: Prefs) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  emit();
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const { enabled: soundEnabled, setEnabled: setSoundEnabled } = useRetroSound();
  const raw = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const prefs = parsePrefs(raw) ?? SERVER_PREFS;

  const indexRef = React.useRef(prefs.currentIndex);
  const shuffleRef = React.useRef(prefs.shuffle);
  const repeatRef = React.useRef(prefs.repeat);
  const soundEnabledRef = React.useRef(soundEnabled);
  /** Pausa ou mute explícitos. Desmutar não retoma a faixa. */
  const userStoppedRef = React.useRef(false);
  const prevIndexRef = React.useRef<number | null>(null);
  const applyIndexRef = React.useRef<(next: number, shouldPlay: boolean) => void>(
    () => {},
  );
  const playGenRef = React.useRef(0);
  const handlingEndedRef = React.useRef(false);

  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const persistPatch = React.useCallback(
    (patch: Partial<Prefs>) => {
      writePrefs({ ...prefs, ...patch });
    },
    [prefs],
  );

  const playAudio = React.useCallback((audio: HTMLAudioElement, waitForCanPlay = false) => {
    if (!soundEnabledRef.current) {
      setPlaying(false);
      return;
    }
    const gen = ++playGenRef.current;
    const start = () => {
      if (gen !== playGenRef.current) return;
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    if (!waitForCanPlay && audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      start();
      return;
    }
    audio.addEventListener("canplay", start, { once: true });
  }, []);

  const applyIndex = React.useCallback(
    (next: number, shouldPlay: boolean) => {
      const audio = getSharedAudio();
      const clamped = clamp(next, 0, TRACKS.length - 1);
      if (clamped !== indexRef.current) {
        prevIndexRef.current = indexRef.current;
      }
      indexRef.current = clamped;
      persistPatch({ currentIndex: clamped });
      const nextSrc = TRACKS[clamped].src;
      const sameSrc = audio.src.endsWith(nextSrc);
      if (!sameSrc) {
        audio.src = nextSrc;
      } else {
        audio.currentTime = 0;
      }
      audio.loop = repeatRef.current === "one";
      if (shouldPlay) {
        playAudio(audio, !sameSrc);
      } else {
        playGenRef.current += 1;
        audio.pause();
        setPlaying(false);
      }
    },
    [persistPatch, playAudio],
  );

  React.useEffect(() => {
    indexRef.current = prefs.currentIndex;
    shuffleRef.current = prefs.shuffle;
    repeatRef.current = prefs.repeat;
  }, [prefs]);

  React.useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  React.useEffect(() => {
    applyIndexRef.current = applyIndex;
  }, [applyIndex]);

  React.useEffect(() => {
    const audio = getSharedAudio();
    audio.pause();

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const start = parsePrefs(stored) ?? {
      ...SERVER_PREFS,
      currentIndex: pickRandom(),
    };
    if (!stored) writePrefs(start);

    audio.volume = start.volume;
    if (audio.src === "" || !audio.src.endsWith(TRACKS[start.currentIndex].src)) {
      audio.src = TRACKS[start.currentIndex].src;
    }

    const onTime = () => {
      const dur = audio.duration;
      if (!dur || Number.isNaN(dur)) {
        setProgress(0);
        setCurrentTime(audio.currentTime);
        setDuration(0);
        return;
      }
      setCurrentTime(audio.currentTime);
      setDuration(dur);
      setProgress((audio.currentTime / dur) * 100);
    };

    const advanceAfterEnd = () => {
      if (handlingEndedRef.current) return;
      handlingEndedRef.current = true;

      if (repeatRef.current === "one") {
        audio.currentTime = 0;
        playAudio(audio);
      } else {
        const isLast = indexRef.current >= TRACKS.length - 1;
        if (repeatRef.current === "none" && !shuffleRef.current && isLast) {
          setPlaying(false);
        } else if (shuffleRef.current) {
          applyIndexRef.current(pickRandom(indexRef.current), true);
        } else {
          applyIndexRef.current((indexRef.current + 1) % TRACKS.length, true);
        }
      }

      window.setTimeout(() => {
        handlingEndedRef.current = false;
      }, 50);
    };

    const onEnded = () => {
      // play() no mesmo tick do `ended` é ignorado em alguns browsers.
      window.setTimeout(advanceAfterEnd, 0);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => {
      setPlaying(false);
      if (audio.ended) window.setTimeout(advanceAfterEnd, 0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    let removeUnlock = () => {};

    const startIfAllowed = () => {
      if (!soundEnabledRef.current || userStoppedRef.current) return;
      const gen = ++playGenRef.current;
      audio.muted = false;
      void audio.play().then(() => {
        if (gen !== playGenRef.current || userStoppedRef.current || !soundEnabledRef.current) {
          audio.pause();
          setPlaying(false);
          return;
        }
        setPlaying(true);
      }).catch(() => {
        if (gen === playGenRef.current) setPlaying(false);
      });
    };

    const soundOn = readStoredEnabled();
    soundEnabledRef.current = soundOn;
    if (!soundOn) {
      userStoppedRef.current = true;
      audio.pause();
    } else {
      const gen = ++playGenRef.current;
      audio.muted = false;
      void audio.play().then(() => {
        if (gen !== playGenRef.current || userStoppedRef.current || !soundEnabledRef.current) {
          audio.pause();
          setPlaying(false);
          return;
        }
        setPlaying(true);
      }).catch(() => {
        if (gen !== playGenRef.current || userStoppedRef.current) return;
        setPlaying(false);
        const unlock = () => {
          window.removeEventListener("click", unlock);
          window.removeEventListener("keydown", unlock);
          // Mute/pausa gravam no clique, antes deste listener no window.
          if (!readStoredEnabled()) {
            userStoppedRef.current = true;
            return;
          }
          if (userStoppedRef.current) return;
          startIfAllowed();
        };
        window.addEventListener("click", unlock);
        window.addEventListener("keydown", unlock);
        removeUnlock = () => {
          window.removeEventListener("click", unlock);
          window.removeEventListener("keydown", unlock);
        };
      });
    }

    return () => {
      removeUnlock();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [playAudio]);

  React.useEffect(() => {
    getSharedAudio().loop = prefs.repeat === "one";
  }, [prefs.repeat]);

  React.useEffect(() => {
    const audio = getSharedAudio();
    audio.volume = prefs.volume;
  }, [prefs.volume]);

  React.useEffect(() => {
    const audio = getSharedAudio();
    audio.muted = !soundEnabled;
    if (!soundEnabled) {
      userStoppedRef.current = true;
      playGenRef.current += 1;
      audio.pause();
      setPlaying(false);
    }
  }, [soundEnabled]);

  const play = React.useCallback(() => {
    userStoppedRef.current = false;
    if (!soundEnabledRef.current) setSoundEnabled(true);
    const audio = getSharedAudio();
    audio.muted = false;
    void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [setSoundEnabled]);

  const pause = React.useCallback(() => {
    userStoppedRef.current = true;
    playGenRef.current += 1;
    getSharedAudio().pause();
    setPlaying(false);
  }, []);

  const togglePlay = React.useCallback(() => {
    const audio = getSharedAudio();
    if (audio.paused) play();
    else pause();
  }, [play, pause]);

  const next = React.useCallback(() => {
    if (shuffleRef.current) {
      applyIndex(pickRandom(indexRef.current), true);
      return;
    }
    applyIndex((indexRef.current + 1) % TRACKS.length, true);
  }, [applyIndex]);

  const prev = React.useCallback(() => {
    const audio = getSharedAudio();
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (shuffleRef.current && prevIndexRef.current != null) {
      applyIndex(prevIndexRef.current, true);
      prevIndexRef.current = null;
      return;
    }
    const upcoming = indexRef.current - 1;
    applyIndex(upcoming < 0 ? TRACKS.length - 1 : upcoming, true);
  }, [applyIndex]);

  const seek = React.useCallback((percent: number) => {
    const audio = getSharedAudio();
    if (!audio.duration || Number.isNaN(audio.duration)) return;
    audio.currentTime = (clamp(percent, 0, 100) / 100) * audio.duration;
  }, []);

  const setVolume = React.useCallback(
    (value: number) => {
      const nextVolume = clamp(value, 0, 1);
      getSharedAudio().volume = nextVolume;
      persistPatch({ volume: nextVolume });
    },
    [persistPatch],
  );

  const toggleShuffle = React.useCallback(() => {
    persistPatch({ shuffle: !shuffleRef.current });
  }, [persistPatch]);

  const cycleRepeat = React.useCallback(() => {
    const order: RepeatMode[] = ["none", "all", "one"];
    const nextMode = order[(order.indexOf(repeatRef.current) + 1) % order.length];
    persistPatch({ repeat: nextMode });
  }, [persistPatch]);

  const value = React.useMemo<MusicContextValue>(
    () => ({
      tracks: TRACKS,
      currentTrack: TRACKS[prefs.currentIndex] ?? FALLBACK_TRACK,
      currentIndex: prefs.currentIndex,
      playing,
      progress,
      currentTime,
      duration,
      volume: prefs.volume,
      shuffle: prefs.shuffle,
      repeat: prefs.repeat,
      play,
      pause,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      toggleShuffle,
      cycleRepeat,
    }),
    [
      prefs,
      playing,
      progress,
      currentTime,
      duration,
      play,
      pause,
      togglePlay,
      next,
      prev,
      seek,
      setVolume,
      toggleShuffle,
      cycleRepeat,
    ],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusicPlayer(): MusicContextValue {
  return (
    React.useContext(MusicContext) ?? {
      tracks: TRACKS,
      currentTrack: FALLBACK_TRACK,
      currentIndex: 0,
      playing: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
      volume: 0.6,
      shuffle: false,
      repeat: "all",
      play: () => {},
      pause: () => {},
      togglePlay: () => {},
      next: () => {},
      prev: () => {},
      seek: () => {},
      setVolume: () => {},
      toggleShuffle: () => {},
      cycleRepeat: () => {},
    }
  );
}
