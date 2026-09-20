export type Track = {
  id: string;
  src: string;
  title: string;
};

/** Loops lo-fi originais (scripts/generate-lofi.py). */
export const TRACKS: Track[] = [
  { id: "midnight-rain", src: "/music/midnight-rain.mp3", title: "Midnight Rain" },
  { id: "study-lamp", src: "/music/study-lamp.mp3", title: "Study Lamp" },
  { id: "tape-warmth", src: "/music/tape-warmth.mp3", title: "Tape Warmth" },
  { id: "dusty-groove", src: "/music/dusty-groove.mp3", title: "Dusty Groove" },
  { id: "late-tram", src: "/music/late-tram.mp3", title: "Late Tram" },
  { id: "amber-hours", src: "/music/amber-hours.mp3", title: "Amber Hours" },
  { id: "empty-cafe", src: "/music/empty-cafe.mp3", title: "Empty Café" },
];
