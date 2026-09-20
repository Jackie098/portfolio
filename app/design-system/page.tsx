import type { Metadata } from "next";
import {
  Alien,
  Gamepad,
  Heart,
  Joystick,
  Play,
  Power,
  RobotFace,
  Skull,
  Sword,
  Terminal,
  Trophy,
  Zap,
} from "pixelarticons/react";

import { SoundToggle } from "@/components/sound-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlitchText } from "@/components/ui/glitch-text";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { TypingText } from "@/components/ui/typing-text";

export const metadata: Metadata = {
  title: "Design System",
  description: "Showcase do design system retro game / neon.",
};

const swatches = [
  { name: "Primary", className: "bg-primary" },
  { name: "Secondary", className: "bg-secondary" },
  { name: "Accent", className: "bg-accent" },
  { name: "Danger", className: "bg-destructive" },
  { name: "Warning", className: "bg-warning" },
  { name: "Success", className: "bg-success" },
];

const typeScale = [
  { label: "Heading 1", className: "text-2xl", size: "24px" },
  { label: "Heading 2", className: "text-xl", size: "20px" },
  { label: "Heading 3", className: "text-lg", size: "18px" },
  { label: "Body", className: "text-base", size: "16px" },
  { label: "Small", className: "text-sm", size: "14px" },
  { label: "Caption", className: "text-xs", size: "12px" },
];

const icons = [
  { Icon: Gamepad, name: "gamepad" },
  { Icon: Joystick, name: "joystick" },
  { Icon: Heart, name: "heart" },
  { Icon: Zap, name: "zap" },
  { Icon: Trophy, name: "trophy" },
  { Icon: Skull, name: "skull" },
  { Icon: Sword, name: "sword" },
  { Icon: Alien, name: "alien" },
  { Icon: RobotFace, name: "robot-face" },
  { Icon: Terminal, name: "terminal" },
  { Icon: Power, name: "power" },
  { Icon: Play, name: "play" },
];

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle />
        </div>
        <h1 className="font-press-start text-xl text-success neon-sign sm:text-2xl">
          Retro Gaming UI
        </h1>
        <p className="text-sm text-muted-foreground">
          Design system inspirado em videogames clássicos.
        </p>
      </header>

      <section className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="danger">
          <CardHeader>
            <CardTitle>Combat Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress label="Plasma Mastery" value={60} variant="health" showValue />
            <Progress label="Combat Reflexes" value={0} variant="health" showValue />
            <Progress label="Overcharge" value={0} variant="health" showValue />
          </CardContent>
        </Card>
        <Card variant="primary">
          <CardHeader>
            <CardTitle>Tech Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress label="Cyber Defense" value={40} variant="mana" showValue />
            <Progress label="Energy Efficiency" value={33} variant="mana" showValue />
            <Progress label="Neural Link" value={0} variant="mana" showValue />
          </CardContent>
        </Card>
        <Card variant="success">
          <CardHeader>
            <CardTitle>Survival Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress label="Survival Instinct" value={100} variant="exp" showValue />
          </CardContent>
        </Card>
        <Card variant="success">
          <CardHeader>
            <CardTitle>Skill Details</CardTitle>
            <CardDescription>Combat skill</CardDescription>
          </CardHeader>
          <CardContent className="font-press-start text-[0.625rem] uppercase leading-loose">
            <p className="text-destructive">Plasma Mastery</p>
            <p className="text-muted-foreground">
              Increases plasma weapon damage by 15% per level.
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-muted-foreground">Current level</span>
              <span>3</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-muted-foreground">Max level</span>
              <span>5</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-muted-foreground">Status</span>
              <span>Unlocked</span>
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card variant="secondary">
          <CardHeader>
            <CardTitle>Secondary</CardTitle>
            <CardDescription>Borda e título roxos</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="accent">
          <CardHeader>
            <CardTitle>Accent</CardTitle>
            <CardDescription>Borda e título rosa</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="warning">
          <CardHeader>
            <CardTitle>Warning</CardTitle>
            <CardDescription>Borda e título amarelos</CardDescription>
          </CardHeader>
        </Card>
        <Card variant="glow">
          <CardHeader>
            <CardTitle>Glow</CardTitle>
            <CardDescription>Primary + halo neon</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Typography */}
        <Card variant="primary">
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Press Start 2P + Orbitron</CardDescription>
          </CardHeader>
          <CardContent>
            {typeScale.map((t) => (
              <div key={t.label} className="flex items-baseline justify-between gap-3">
                <span className={t.className}>{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.size}</span>
              </div>
            ))}
            <p className="mt-2 font-press-start text-[0.625rem] text-primary retro-glow">
              Press Start 2P
            </p>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card variant="secondary">
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Paleta neon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {swatches.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1">
                  <div
                    className={`pixel-corners h-12 w-full border-2 border-border ${s.className}`}
                  />
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card variant="warning">
          <CardHeader>
            <CardTitle>Action Buttons</CardTitle>
            <CardDescription>
              Cantos pixelados, sobem no hover, afundam no click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="primary">Start Game</Button>
            <Button variant="secondary">Load Save</Button>
            <Button variant="danger">Exit Game</Button>
            <Button variant="warning">Settings</Button>
            <Button variant="success">Continue</Button>
            <Button variant="outline">Options</Button>
            <Button variant="ghost">Credits</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </CardContent>
        </Card>

        {/* Button sizes + ícones */}
        <Card variant="accent">
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>sm / md / lg / icon</CardDescription>
          </CardHeader>
          <CardContent className="items-start">
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="md">
              <Play width={24} height={24} aria-hidden />
              Medium
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="accent" size="icon" aria-label="Ligar console">
              <Power width={24} height={24} aria-hidden />
            </Button>
          </CardContent>
        </Card>

        {/* Terminal Input */}
        <Card>
          <CardHeader>
            <CardTitle>Terminal Input</CardTitle>
            <CardDescription>Form controls</CardDescription>
          </CardHeader>
          <CardContent>
            <Input label="Player Name" placeholder="Enter player name..." />
            <Input
              label="Access Code"
              placeholder="Access code..."
              hint="6 dígitos recebidos via WhatsApp"
            />
            <Input
              label="Server"
              defaultValue="offline"
              error="Servidor indisponível"
            />
            <Input label="Locked" placeholder="Disabled..." disabled />
          </CardContent>
        </Card>

        {/* System Status */}
        <Card variant="glow">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Barras de progresso</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress label="Health" value={85} variant="health" showValue />
            <Progress label="Mana" value={60} variant="mana" showValue />
            <Progress label="EXP" value={92} variant="exp" showValue />
            <Progress label="Energy" value={40} variant="warning" showValue />
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">
              Refresh
            </Button>
          </CardFooter>
        </Card>

        {/* Terminal / typing */}
        <Card variant="success">
          <CardHeader>
            <CardTitle>Typing</CardTitle>
            <CardDescription>Texto revelado por máscara CSS</CardDescription>
          </CardHeader>
          <CardContent className="font-press-start text-[0.625rem] leading-loose text-success">
            <TypingText text="> system initialized" speed={0.05} caret={false} />
            <TypingText text="> loading assets... [ok]" speed={0.05} caret={false} />
            <TypingText text="> ready for input" speed={0.05} />
          </CardContent>
        </Card>

        {/* Glitch + Neon + Pulse */}
        <Card variant="accent">
          <CardHeader>
            <CardTitle>Text Effects</CardTitle>
            <CardDescription>Glitch, neon sign e pulse</CardDescription>
          </CardHeader>
          <CardContent className="gap-5">
            <GlitchText
              text="GAME OVER"
              className="font-press-start text-base text-foreground"
            />
            <span className="font-press-start text-base text-accent neon-sign">
              INSERT COIN
            </span>
            <span className="pulse-neon inline-flex w-fit items-center gap-2 font-press-start text-[0.625rem] text-warning">
              <Zap width={24} height={24} aria-hidden />
              POWER UP
            </span>
          </CardContent>
        </Card>

        {/* Loading */}
        <Card variant="danger">
          <CardHeader>
            <CardTitle>Loading</CardTitle>
            <CardDescription>Rotação em passos discretos</CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            <Spinner size={24} label="Carregando dados" />
            <Spinner size={48} label="Carregando mundo" className="text-accent" />
            <Progress label="Download" value={35} variant="primary" showValue />
          </CardContent>
        </Card>

        {/* Ícones */}
        <Card variant="primary" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Icons</CardTitle>
            <CardDescription>pixelarticons — conjunto free (24px)</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-4 gap-4 sm:grid-cols-6">
              {icons.map(({ Icon, name }) => (
                <li
                  key={name}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon width={24} height={24} className="text-primary" aria-hidden />
                  <span className="text-xs text-muted-foreground">{name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cursor */}
        <Card>
          <CardHeader>
            <CardTitle>Cursor</CardTitle>
            <CardDescription>Pixel art + rastro animado</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Seta pixelada por padrão, mão neon sobre elementos interativos e
              cursor nativo dentro de campos de texto. Sobre cada variante de
              botão, mão e quadrado trocam de token p/ contrastar com o fill.
            </p>
            <p className="text-xs text-muted-foreground">
              Em telas de toque e com redução de movimento ativa, o rastro é
              desligado e o cursor do sistema volta.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
