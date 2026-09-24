"use client";

import {
  ChevronLeft,
  ChevronRight,
  Music,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  Volume1,
  Volume2,
  Volume3,
  VolumeX,
} from "pixelarticons/react";
import * as React from "react";

import { useMusicPlayer } from "@/components/music-player/music-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const EXPANDED_KEY = "music-player-expanded";

let expandedListeners: Array<() => void> = [];

function subscribeExpanded(onChange: () => void) {
  expandedListeners = [...expandedListeners, onChange];
  window.addEventListener("storage", onChange);
  return () => {
    expandedListeners = expandedListeners.filter((listener) => listener !== onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getExpandedSnapshot() {
  return window.localStorage.getItem(EXPANDED_KEY) !== "false";
}

function getExpandedServerSnapshot() {
  return true;
}

function writeExpanded(value: boolean) {
  window.localStorage.setItem(EXPANDED_KEY, String(value));
  expandedListeners.forEach((listener) => listener());
}

function formatTime(seconds: number) {
  if (!seconds || Number.isNaN(seconds) || !Number.isFinite(seconds)) {
    return "00:00";
  }
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function VolumeIcon({ volume }: { volume: number }) {
  if (volume <= 0) return <VolumeX width={24} height={24} aria-hidden />;
  if (volume < 0.34) return <Volume1 width={24} height={24} aria-hidden />;
  if (volume < 0.67) return <Volume2 width={24} height={24} aria-hidden />;
  return <Volume3 width={24} height={24} aria-hidden />;
}

type MusicPlayerWidgetProps = {
  fixed?: boolean;
  /** No header mobile: recolhido na linha; expandido vira painel sem estourar a largura. */
  dock?: boolean;
  className?: string;
};

export function MusicPlayerWidget({
  fixed = true,
  dock = false,
  className,
}: MusicPlayerWidgetProps) {
  const {
    currentTrack,
    playing,
    progress,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleShuffle,
    cycleRepeat,
  } = useMusicPlayer();

  const expanded = React.useSyncExternalStore(
    subscribeExpanded,
    getExpandedSnapshot,
    getExpandedServerSnapshot,
  );
  const lastVolume = React.useRef(0.6);

  const toggleExpanded = () => {
    writeExpanded(!expanded);
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    seek(percent);
  };

  const handleSeekKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      seek(Math.min(100, progress + 5));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      seek(Math.max(0, progress - 5));
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      lastVolume.current = volume;
      setVolume(0);
      return;
    }
    setVolume(lastVolume.current);
  };

  const repeatLabel =
    repeat === "one"
      ? "Repetir faixa"
      : repeat === "all"
        ? "Repetir lista"
        : "Não repetir";

  const controls = (
    <CardContent className="gap-3 p-0">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Faixa anterior"
              onClick={prev}
            >
              <ChevronLeft width={24} height={24} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "text-accent",
                playing && "filter-[drop-shadow(0_0_8px_var(--accent))]",
              )}
              aria-label={playing ? "Pausar" : "Tocar"}
              onClick={togglePlay}
            >
              {playing ? (
                <Pause width={24} height={24} aria-hidden />
              ) : (
                <Play width={24} height={24} aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Próxima faixa"
              onClick={next}
            >
              <ChevronRight width={24} height={24} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(shuffle && "text-accent")}
              aria-pressed={shuffle}
              aria-label={shuffle ? "Desativar aleatório" : "Ativar aleatório"}
              onClick={toggleShuffle}
            >
              <Shuffle width={24} height={24} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(repeat !== "none" && "text-accent")}
              aria-pressed={repeat !== "none"}
              aria-label={repeatLabel}
              onClick={cycleRepeat}
            >
              {repeat === "one" ? (
                <Repeat1 width={24} height={24} aria-hidden />
              ) : (
                <Repeat width={24} height={24} aria-hidden />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="min-w-0 flex-1 cursor-pointer"
              onClick={handleSeek}
              onKeyDown={handleSeekKey}
              tabIndex={0}
              aria-label="Posição da faixa"
            >
              <Progress value={progress} variant="accent" />
            </div>
            <p className="shrink-0 font-press-start text-[0.5rem] text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={volume > 0 ? "Silenciar" : "Ativar volume"}
              onClick={toggleMute}
            >
              <VolumeIcon volume={volume} />
            </Button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              aria-label="Volume"
              className="pixel-range min-w-0 flex-1"
              onChange={(event) => {
                const nextVolume = Number(event.target.value);
                if (nextVolume > 0) lastVolume.current = nextVolume;
                setVolume(nextVolume);
              }}
            />
          </div>
        </CardContent>
  );

  const bar = (
    <Card
      variant="accent"
      className={cn(
        "gap-3 p-3",
        dock ? "w-auto min-w-0 max-w-full" : expanded ? "w-72" : "w-auto",
      )}
    >
      <CardHeader className="p-0">
        <div className="flex items-center gap-2">
          <Music width={24} height={24} className="shrink-0 text-accent" aria-hidden />
          <p className="min-w-0 flex-1 truncate font-press-start text-[0.5rem] leading-relaxed text-foreground uppercase">
            {currentTrack.title}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={expanded}
            aria-label={expanded ? "Recolher player" : "Expandir player"}
            onClick={toggleExpanded}
          >
            {expanded ? (
              <ChevronLeft width={24} height={24} className="rotate-90" aria-hidden />
            ) : (
              <ChevronRight width={24} height={24} className="rotate-90" aria-hidden />
            )}
          </Button>
        </div>
      </CardHeader>
      {expanded && !dock ? controls : null}
    </Card>
  );

  return (
    <div
      className={cn(
        "relative",
        fixed && "fixed right-4 bottom-4 z-50",
        className,
      )}
    >
      {bar}
      {expanded && dock ? (
        <Card
          variant="accent"
          className="absolute top-full right-0 z-30 mt-2 w-72 max-w-[calc(100vw-3rem)] gap-3 p-3"
        >
          {controls}
        </Card>
      ) : null}
    </div>
  );
}
