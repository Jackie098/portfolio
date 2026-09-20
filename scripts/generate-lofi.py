#!/usr/bin/env python3
"""Original lo-fi loops for the music player. Slow, warm, not chiptune."""

from __future__ import annotations

import math
import struct
import subprocess
import wave
from dataclasses import dataclass
from pathlib import Path

RATE = 22050
TABLE = 4096
SINE = [math.sin(2 * math.pi * i / TABLE) for i in range(TABLE)]

NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


def hz(note: str) -> float:
    if note == "-":
        return 0.0
    name, octave = note[:-1], int(note[-1])
    n = NAMES.index(name) + (octave + 1) * 12
    return 440.0 * (2 ** ((n - 69) / 12))


def sine(t: float, freq: float) -> float:
    if freq <= 0:
        return 0.0
    return SINE[int(t * freq * TABLE) & (TABLE - 1)]


def hash_noise(i: int, seed: int) -> float:
    x = (i * 1103515245 + 12345 + seed * 997) & 0x7FFFFFFF
    return (x / 0x7FFFFFFF) * 2.0 - 1.0


def env_hit(phase: float, length: float) -> float:
    if phase < 0 or phase > length:
        return 0.0
    return math.exp(-phase * 18.0)


def pick_span(pos: float, spans: list[tuple[float, object]]):
    total = sum(length for length, _ in spans)
    pos = pos % total
    acc = 0.0
    for length, value in spans:
        if acc <= pos < acc + length:
            return value, pos - acc, length
        acc += length
    return spans[-1][1], 0.0, spans[-1][0]


@dataclass(frozen=True)
class TrackSpec:
    name: str
    bpm: float
    seconds: int
    seed: int
    chords: list[tuple[float, list[str]]]
    bass: list[tuple[float, str]]
    melody: list[tuple[float, str]]
    vinyl: float
    hat: float


SPECS: list[TrackSpec] = [
    TrackSpec(
        name="midnight-rain",
        bpm=72,
        seconds=36,
        seed=11,
        chords=[
            (4, ["F3", "A3", "E4"]),
            (4, ["D3", "F3", "C4"]),
            (4, ["G3", "A#3", "F4"]),
            (4, ["C3", "E3", "A#3"]),
        ],
        bass=[(4, "F2"), (4, "D2"), (4, "G2"), (4, "C2")],
        melody=[
            (4, "A4"),
            (4, "C5"),
            (2, "G4"),
            (2, "-"),
            (4, "E4"),
        ],
        vinyl=0.045,
        hat=0.035,
    ),
    TrackSpec(
        name="study-lamp",
        bpm=76,
        seconds=36,
        seed=23,
        chords=[
            (4, ["A3", "C4", "G4"]),
            (4, ["D3", "F3", "C4"]),
            (4, ["G3", "B3", "F4"]),
            (4, ["C3", "E3", "B3"]),
        ],
        bass=[(4, "A2"), (4, "D2"), (4, "G2"), (4, "C2")],
        melody=[
            (3, "E4"),
            (1, "-"),
            (4, "F4"),
            (2, "D4"),
            (2, "G4"),
            (4, "E4"),
        ],
        vinyl=0.03,
        hat=0.04,
    ),
    TrackSpec(
        name="tape-warmth",
        bpm=70,
        seconds=36,
        seed=41,
        chords=[
            (4, ["D#3", "G3", "D4"]),
            (4, ["C3", "D#3", "A#3"]),
            (4, ["F3", "G#3", "D#4"]),
            (4, ["A#2", "D3", "G#3"]),
        ],
        bass=[(4, "D#2"), (4, "C2"), (4, "F2"), (4, "A#1")],
        melody=[
            (6, "G4"),
            (2, "-"),
            (4, "A#4"),
            (4, "F4"),
        ],
        vinyl=0.055,
        hat=0.028,
    ),
    TrackSpec(
        name="dusty-groove",
        bpm=78,
        seconds=36,
        seed=59,
        chords=[
            (4, ["D3", "F3", "C4"]),
            (4, ["G3", "B3", "F4"]),
            (4, ["C3", "E3", "B3"]),
            (4, ["A3", "C4", "G4"]),
        ],
        bass=[(4, "D2"), (4, "G2"), (4, "C2"), (4, "A2")],
        melody=[
            (2, "F4"),
            (2, "A4"),
            (4, "G4"),
            (4, "E4"),
            (4, "C4"),
        ],
        vinyl=0.05,
        hat=0.042,
    ),
    TrackSpec(
        name="late-tram",
        bpm=68,
        seconds=36,
        seed=67,
        chords=[
            (4, ["B2", "D3", "A3"]),
            (4, ["E3", "G#3", "D4"]),
            (4, ["A2", "C#3", "G#3"]),
            (4, ["F#3", "A3", "E4"]),
        ],
        bass=[(4, "B1"), (4, "E2"), (4, "A1"), (4, "F#2")],
        melody=[
            (4, "F#4"),
            (4, "-"),
            (4, "C#5"),
            (4, "A4"),
        ],
        vinyl=0.038,
        hat=0.03,
    ),
    TrackSpec(
        name="amber-hours",
        bpm=74,
        seconds=36,
        seed=83,
        chords=[
            (4, ["G3", "B3", "F#4"]),
            (4, ["E3", "G3", "D4"]),
            (4, ["A3", "C4", "G4"]),
            (4, ["D3", "F#3", "C4"]),
        ],
        bass=[(4, "G2"), (4, "E2"), (4, "A2"), (4, "D2")],
        melody=[
            (4, "B4"),
            (2, "A4"),
            (2, "-"),
            (4, "D5"),
            (4, "G4"),
        ],
        vinyl=0.034,
        hat=0.036,
    ),
    TrackSpec(
        name="empty-cafe",
        bpm=66,
        seconds=36,
        seed=97,
        chords=[
            (4, ["C3", "E3", "B3"]),
            (4, ["E3", "G3", "D4"]),
            (4, ["F3", "A3", "E4"]),
            (4, ["G3", "B3", "F4"]),
        ],
        bass=[(4, "C2"), (4, "E2"), (4, "F2"), (4, "G2")],
        melody=[
            (6, "E4"),
            (2, "D4"),
            (4, "G4"),
            (4, "-"),
        ],
        vinyl=0.04,
        hat=0.025,
    ),
]


def render(spec: TrackSpec) -> bytes:
    n = int(RATE * spec.seconds)
    beat_sec = 60.0 / spec.bpm
    frames = bytearray()
    lp = 0.0
    wow = 0.0

    for i in range(n):
        t = i / RATE
        beat = t / beat_sec
        wow = 1.0 + 0.003 * math.sin(t * 0.35 + spec.seed)

        chord, chord_age, chord_len = pick_span(beat, spec.chords)
        pad = 0.0
        pad_env = min(1.0, (chord_age * beat_sec) / 0.18)
        for note in chord:
            pad += sine(t * wow, hz(note)) * 0.11
            pad += sine(t * wow, hz(note) * 2) * 0.035
        pad *= pad_env

        bass_note, bass_age, _ = pick_span(beat, spec.bass)
        bass_env = min(1.0, (bass_age * beat_sec) / 0.08)
        bass = sine(t * wow, hz(bass_note)) * 0.22 * bass_env
        bass += sine(t * wow, hz(bass_note) * 0.5) * 0.08 * bass_env

        mel_note, mel_age, mel_len = pick_span(beat, spec.melody)
        mel = 0.0
        if mel_note != "-":
            attack = min(1.0, (mel_age * beat_sec) / 0.12)
            remain = (mel_len - mel_age) * beat_sec
            release = 1.0 if remain > 0.25 else max(0.0, remain / 0.25)
            mel = sine(t * wow, hz(mel_note)) * 0.13 * attack * release
            mel += sine(t * wow, hz(mel_note) * 2.005) * 0.03 * attack * release

        bar = beat % 4.0
        kick_p = bar % 2.0
        kick = sine(t, 62 - kick_p * 28) * 0.28 * env_hit(kick_p, 0.22)

        snare_p = (bar - 1.0) % 2.0
        snare = hash_noise(i, spec.seed) * 0.16 * env_hit(snare_p, 0.14)
        snare += sine(t, 180) * 0.05 * env_hit(snare_p, 0.1)

        swung = beat * 2.0
        eighth = swung - math.floor(swung)
        if math.floor(swung) % 2 == 1:
            eighth = (beat * 2.0 - 0.12) - math.floor(beat * 2.0 - 0.12)
        hat = hash_noise(i * 3, spec.seed + 3) * spec.hat * env_hit(eighth * beat_sec / 2, 0.05)

        vinyl = hash_noise(i, spec.seed + 9) * spec.vinyl
        if (i + spec.seed) % 19000 < 6:
            vinyl += hash_noise(i, 1) * 0.12

        sample = pad + bass + mel + kick + snare + hat + vinyl
        lp += 0.22 * (sample - lp)
        v = max(-1.0, min(1.0, lp * 0.95))
        frames += struct.pack("<h", int(v * 32767))

    return bytes(frames)


def write_wav(path: Path, data: bytes) -> None:
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(data)


def main() -> None:
    out = Path(__file__).resolve().parents[1] / "public" / "music"
    out.mkdir(parents=True, exist_ok=True)
    tmp = out / "_tmp"
    tmp.mkdir(exist_ok=True)

    for old in out.glob("*.mp3"):
        old.unlink()

    for spec in SPECS:
        wav = tmp / f"{spec.name}.wav"
        mp3 = out / f"{spec.name}.mp3"
        print(f"rendering {spec.name}…")
        write_wav(wav, render(spec))
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-i",
                str(wav),
                "-codec:a",
                "libmp3lame",
                "-q:a",
                "5",
                "-af",
                "lowpass=f=8500,highpass=f=40,volume=1.1",
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
