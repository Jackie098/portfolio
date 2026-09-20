export type Track = {
  id: string;
  src: string;
  title: string;
};

/** Loops 8-bit originais (scripts/generate-chiptune.py) — não são transcrições Nintendo. */
export const TRACKS: Track[] = [
  { id: "overworld", src: "/music/overworld.mp3", title: "Overworld Theme" },
  { id: "underground", src: "/music/underground.mp3", title: "Underground Theme" },
  { id: "starman", src: "/music/starman.mp3", title: "Starman (Invincibility)" },
  { id: "castle", src: "/music/castle.mp3", title: "Castle Theme" },
  { id: "water", src: "/music/water.mp3", title: "Water (Underwater) Theme" },
  { id: "athletic", src: "/music/athletic.mp3", title: "Athletic Theme (SMW)" },
  { id: "game-over", src: "/music/game-over.mp3", title: "Game Over" },
];
