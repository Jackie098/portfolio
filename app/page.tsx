import type { Metadata } from "next";
import {
  Code,
  Cpu,
  Database,
  Download,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Message,
  React as ReactIcon,
  Script,
  Server,
} from "pixelarticons/react";

import { HeroCodingAvatar } from "@/components/hero-coding-avatar";
import { ThemeAsset } from "@/components/theme-asset";
import { PlayerDossier } from "@/components/player-dossier";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  EmailLink,
  GithubLink,
  LinkedinLink,
  Profile,
} from "@/components/ui/profile";
import { RetroSlider, type TechItem } from "@/components/ui/retro-slider";
import { RetroTimeline } from "@/components/ui/retro-timeline";
import { TypingText } from "@/components/ui/typing-text";
import {
  profileTags,
  projects,
  site,
  skills,
  tech,
  timeline,
} from "@/content/site";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Conversar")}`;

const techIcons: Record<string, TechItem["icon"]> = {
  react: <ReactIcon width={24} height={24} aria-hidden />,
  node: <Server width={24} height={24} aria-hidden />,
  java: <Cpu width={24} height={24} aria-hidden />,
  spring: <Code width={24} height={24} aria-hidden />,
  quarkus: <Code width={24} height={24} aria-hidden />,
  sql: <Database width={24} height={24} aria-hidden />,
  rabbit: <Message width={24} height={24} aria-hidden />,
  python: <Script width={24} height={24} aria-hidden />,
  ts: <Code width={24} height={24} aria-hidden />,
  next: <ReactIcon width={24} height={24} aria-hidden />,
};

const techItems: TechItem[] = tech.map((item) => ({
  ...item,
  icon: techIcons[item.id],
}));

export const metadata: Metadata = {
  title: "Portfólio",
  description: `${site.name} — ${site.headline}. ${site.pitch}`,
};

export default function HomePage() {
  return (
    <div className="mx-auto min-w-0 max-w-5xl px-6">
      <SiteHeader />

      <main className="flex flex-col gap-20 pb-8">
        <section
          aria-labelledby="hero-heading"
          className="flex min-h-svh flex-col justify-center pt-24 md:min-h-[calc(100svh-7rem)] md:pt-0"
        >
          <div className="grid w-full min-w-0 items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
            <div className="flex min-w-0 flex-col items-center gap-6 text-center md:items-start md:text-left">
              <ThemeAsset
                darkSrc={site.logoMark}
                lightSrc={site.logoMarkLight}
                alt={`Marca ${site.name}`}
                width={1024}
                height={1024}
                className="aspect-square w-40 md:hidden"
              />
              <p className="w-full min-w-0 max-w-full font-press-start text-[0.5rem] text-success">
                <TypingText className="typing-wrap" text={`> ${site.headline}`} />
              </p>
              <h1
                id="hero-heading"
                className="font-press-start text-2xl leading-relaxed text-primary neon-sign sm:text-3xl"
              >
                {site.name}
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {site.pitch}
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                <Button asChild variant="primary" size="lg">
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin width={24} height={24} aria-hidden />
                    Entrar em contato
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={site.cv} download={site.cvFilename}>
                    <Download width={24} height={24} aria-hidden />
                    Baixar CV
                  </a>
                </Button>
              </div>
            </div>
            <HeroCodingAvatar />
          </div>
        </section>

        <PlayerDossier>
          <Profile
            name={site.name}
            role={site.headline}
            bio={site.playerBio}
            avatar={site.avatar}
            initials="CA"
            location={site.location}
            status="online"
            tags={[...profileTags]}
            links={[
              LinkedinLink(site.linkedin),
              EmailLink(site.email),
              GithubLink(site.github),
            ]}
          />
        </PlayerDossier>

        <section id="sobre" className="scroll-mt-24" aria-labelledby="sobre-heading">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
            <figure className="relative mx-auto w-full max-w-sm overflow-hidden md:mx-0 md:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.techMageAvatar}
                alt={`${site.name} em pixel art, variação tech mage`}
                width={1024}
                height={1024}
                className="h-auto w-full rounded-lg"
              />
            </figure>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground md:items-end md:text-right">
              <h2
                id="sobre-heading"
                className="font-press-start text-sm text-primary retro-glow"
              >
                Sobre
              </h2>
              <div className="flex max-w-prose flex-col gap-4">
                {site.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="xp" className="scroll-mt-24" aria-labelledby="xp-heading">
          <h2
            id="xp-heading"
            className="mb-6 font-press-start text-sm text-primary retro-glow"
          >
            Quest log
          </h2>
          <RetroTimeline entries={timeline} />
        </section>

        <section id="cases" className="scroll-mt-24" aria-labelledby="cases-heading">
          <h2
            id="cases-heading"
            className="mb-6 font-press-start text-sm text-primary retro-glow"
          >
            Cases
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} variant={project.variant} className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">{project.title}</CardTitle>
                  <CardDescription>{project.org}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologias">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="pixel-corners border border-border px-1.5 py-0.5 font-press-start text-[0.45rem] text-muted-foreground [--pixel-step:1px]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {project.href ? (
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkIcon width={24} height={24} aria-hidden />
                        Abrir site
                      </a>
                    </Button>
                  </CardFooter>
                ) : null}
              </Card>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-24" aria-labelledby="stack-heading">
          <h2
            id="stack-heading"
            className="mb-6 font-press-start text-sm text-primary retro-glow"
          >
            Stack
          </h2>
          <RetroSlider items={techItems} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {skills.map((skill) => (
              <Progress
                key={skill.label}
                label={skill.label}
                value={skill.value}
                variant={skill.variant}
                showValue
              />
            ))}
          </div>
        </section>

        <section
          id="contato"
          className="scroll-mt-24 pb-8 text-center md:text-left"
          aria-labelledby="contato-heading"
        >
          <h2
            id="contato-heading"
            className="mb-6 font-press-start text-sm text-primary retro-glow"
          >
            Contato
          </h2>
          <p className="mx-auto mb-6 max-w-prose text-sm leading-relaxed text-muted-foreground md:mx-0">
            Se quiser conversar sobre projeto, oportunidade ou parceria, pode
            me chamar no LinkedIn. Se preferir, também deixei email e CV logo
            abaixo.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <Button asChild variant="primary" size="lg">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin width={24} height={24} aria-hidden />
                Entrar em contato
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.cv} download={site.cvFilename}>
                <Download width={24} height={24} aria-hidden />
                Baixar CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={mailto}>
                <Mail width={24} height={24} aria-hidden />
                Enviar email
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                Abrir GitHub
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{site.email}</p>
        </section>
      </main>
    </div>
  );
}
