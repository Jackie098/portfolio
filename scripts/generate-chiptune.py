#!/usr/bin/env python3
"""Original 8-bit loops for the music player. Not Nintendo transcriptions."""

from __future__ import annotations

import math
import struct
import subprocess
import wave
from pathlib import Path

RATE = 22050
AMP = 0.22

# Midi-ish note names → Hz
def hz(note: str) -> float:
    names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    name, octave = note[:-1], int(note[-1])
    n = names.index(name) + (octave + 1) * 12
    return 440.0 * (2 ** ((n - 69) / 12))


def square(t: float, freq: float, duty: float = 0.5) -> float:
    if freq <= 0:
        return 0.0
    return AMP if (t * freq) % 1.0 < duty else -AMP


def triangle(t: float, freq: float) -> float:
    if freq <= 0:
        return 0.0
    p = (t * freq) % 1.0
    return AMP * (2 * abs(2 * p - 1) - 1) * 0.7


def noise(t: float, cutoff: float) -> float:
    # cheap LCG noise gated by a pulse
    n = math.sin(t * 12345.678) * 43758.5453
    n = n - math.floor(n)
    return AMP * 0.35 * (n * 2 - 1) * cutoff


def render(seconds: float, sample: callable) -> bytes:
    n = int(RATE * seconds)
    frames = bytearray()
    for i in range(n):
        t = i / RATE
        v = max(-1.0, min(1.0, sample(t)))
        frames += struct.pack("<h", int(v * 32767))
    return bytes(frames)


def write_wav(path: Path, data: bytes) -> None:
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(data)


def seq(t: float, bpm: float, notes: list[str], beats: list[float], wave_fn) -> float:
    beat = 60.0 / bpm
    total = sum(beats)
    pos = (t / beat) % total
    acc = 0.0
    for note, length in zip(notes, beats):
        if acc <= pos < acc + length:
            local = (pos - acc) * beat
            env = 1.0
            if local < 0.01:
                env = local / 0.01
            release = length * beat * 0.15
            remain = (acc + length) * beat - (pos * beat)
            if remain < release:
                env *= max(0.0, remain / release)
            freq = hz(note) if note != "-" else 0.0
            return wave_fn(t, freq) * env
        acc += length
    return 0.0


def mix(*parts: float) -> float:
    return sum(parts)


TRACKS: dict[str, callable] = {}


def overworld(t: float) -> float:
    lead_n = [
        "G4", "E4", "C4", "G4", "A4", "G4", "E4", "C5",
        "G4", "B4", "C5", "D5", "C5", "G4", "E4", "C4",
    ]
    lead_b = [0.5] * 16
    bass_n = ["C3", "C3", "G2", "G2", "F2", "F2", "G2", "G2"] * 2
    bass_b = [1] * 16
    lead = seq(t, 140, lead_n, lead_b, lambda tt, f: square(tt, f, 0.5))
    bass = seq(t, 140, bass_n, bass_b, triangle)
    kick = noise(t, 1.0 if (t * 140 / 60) % 1 < 0.08 else 0.0) * 0.6
    return mix(lead, bass * 0.9, kick)


def underground(t: float) -> float:
    lead_n = ["C4", "G3", "D#4", "C4", "A#3", "G3", "F3", "G3"]
    lead_b = [1, 1, 1, 1, 1, 1, 1, 1]
    bass_n = ["C2", "G2", "C2", "A#1"] * 2
    bass_b = [2] * 8
    lead = seq(t, 90, lead_n, lead_b, lambda tt, f: square(tt, f, 0.25))
    bass = seq(t, 90, bass_n, bass_b, triangle)
    return mix(lead * 0.85, bass)


def starman(t: float) -> float:
    arps = ["C5", "E5", "G5", "C6", "G5", "E5", "D5", "G5", "B5", "D6", "B5", "G5"]
    arps_b = [0.25] * 12
    bass_n = ["C3", "G3", "C3", "G3", "D3", "A3", "D3", "G3"]
    bass_b = [0.5] * 8
    lead = seq(t, 180, arps, arps_b, lambda tt, f: square(tt, f, 0.5))
    bass = seq(t, 180, bass_n, bass_b, triangle)
    hat = noise(t, 1.0 if (t * 180 / 60 * 2) % 1 < 0.06 else 0.0) * 0.4
    return mix(lead, bass * 0.8, hat)


def castle(t: float) -> float:
    lead_n = ["D4", "F4", "A4", "D5", "C5", "A4", "F4", "E4", "D4", "A3", "D4", "-"]
    lead_b = [0.75, 0.25, 0.75, 0.25, 1, 1, 1, 1, 1, 1, 1, 1]
    bass_n = ["D2", "D2", "A1", "C2", "D2", "F2", "A1", "A1"]
    bass_b = [1] * 8
    lead = seq(t, 100, lead_n, lead_b, lambda tt, f: square(tt, f, 0.125))
    bass = seq(t, 100, bass_n, bass_b, triangle)
    rumble = noise(t, 0.35 if (t * 100 / 60) % 4 < 0.2 else 0.0) * 0.5
    return mix(lead, bass, rumble)


def water(t: float) -> float:
    lead_n = ["E4", "G4", "B4", "E5", "D5", "B4", "A4", "G4", "F#4", "A4", "D5", "B4"]
    lead_b = [2 / 3] * 12
    bass_n = ["E2", "B2", "E3", "B2", "A2", "E3", "D3", "A2"]
    bass_b = [1] * 8
    lead = seq(t, 96, lead_n, lead_b, lambda tt, f: square(tt, f, 0.5))
    bass = seq(t, 96, bass_n, bass_b, triangle)
    bubble = square(t, 8 + 4 * math.sin(t * 0.7), 0.5) * 0.08
    return mix(lead * 0.8, bass * 0.7, bubble)


def athletic(t: float) -> float:
    lead_n = [
        "C5", "D5", "E5", "G5", "E5", "D5", "C5", "G4",
        "A4", "C5", "D5", "E5", "D5", "C5", "B4", "G4",
    ]
    lead_b = [0.5] * 16
    bass_n = ["C3", "C3", "E3", "G3", "A2", "A2", "C3", "E3"] * 2
    bass_b = [0.5] * 16
    lead = seq(t, 160, lead_n, lead_b, lambda tt, f: square(tt, f, 0.5))
    bass = seq(t, 160, bass_n, bass_b, triangle)
    snare = noise(t, 1.0 if (t * 160 / 60) % 1 > 0.48 and (t * 160 / 60) % 1 < 0.58 else 0.0)
    return mix(lead, bass * 0.85, snare * 0.45)


def game_over(t: float) -> float:
    lead_n = ["E4", "C4", "G3", "E3", "C3", "G2", "E2", "-"]
    lead_b = [1, 1, 1, 1, 1.5, 1.5, 2, 2]
    bass_n = ["C3", "G2", "E2", "C2", "G1", "C1", "C1", "-"]
    bass_b = [1, 1, 1, 1, 1.5, 1.5, 2, 2]
    lead = seq(t, 72, lead_n, lead_b, lambda tt, f: square(tt, f, 0.5))
    bass = seq(t, 72, bass_n, bass_b, triangle)
    return mix(lead, bass)


TRACKS = {
    "overworld": (overworld, 24),
    "underground": (underground, 24),
    "starman": (starman, 16),
    "castle": (castle, 24),
    "water": (water, 24),
    "athletic": (athletic, 20),
    "game-over": (game_over, 16),
}


def main() -> None:
    out = Path(__file__).resolve().parents[1] / "public" / "music"
    out.mkdir(parents=True, exist_ok=True)
    tmp = out / "_tmp"
    tmp.mkdir(exist_ok=True)

    for name, (fn, seconds) in TRACKS.items():
        wav = tmp / f"{name}.wav"
        mp3 = out / f"{name}.mp3"
        write_wav(wav, render(seconds, fn))
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(wav),
                "-codec:a",
                "libmp3lame",
                "-q:a",
                "6",
                str(mp3),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        print(f"wrote {mp3}")

    for f in tmp.iterdir():
        f.unlink()
    tmp.rmdir()


if __name__ == "__main__":
    main()
