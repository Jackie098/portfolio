import { Github, Linkedin, Mail, MapPin, User } from "pixelarticons/react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Progress, type ProgressProps } from "@/components/ui/progress";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type ProfileStatus = "online" | "busy" | "away" | "offline";

export interface ProfileStat {
  label: string;
  value: number;
  variant?: ProgressProps["variant"];
}

export interface ProfileLink {
  label: string;
  href: string;
  /** Rendered icon node — defaults to ExternalLink icon if omitted. */
  icon?: React.ReactNode;
}

export interface ProfileProps {
  name: string;
  role: string;
  bio?: string;
  /** URL for the avatar image. Falls back to initials when absent. */
  avatar?: string;
  /**
   * Two-letter initials shown when no avatar URL is provided.
   * Derived from name automatically when omitted.
   */
  initials?: string;
  location?: string;
  status?: ProfileStatus;
  stats?: ProfileStat[];
  /** Tech / skill tags displayed as pixel chips. */
  tags?: string[];
  links?: ProfileLink[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Config                                                              */
/* ------------------------------------------------------------------ */

const statusConfig: Record<
  ProfileStatus,
  { label: string; dotClass: string; textClass: string }
> = {
  online:  { label: "ONLINE",  dotClass: "bg-success",            textClass: "text-success" },
  busy:    { label: "BUSY",    dotClass: "bg-destructive",        textClass: "text-destructive" },
  away:    { label: "AWAY",    dotClass: "bg-warning",            textClass: "text-warning" },
  offline: { label: "OFFLINE", dotClass: "bg-muted-foreground",   textClass: "text-muted-foreground" },
};

function deriveInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Avatar({
  src,
  initials,
  name,
}: {
  src?: string;
  initials: string;
  name: string;
}) {
  return (
    <div
      className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden pixel-corners [--pixel-step:4px] border-2 border-primary bg-muted"
      aria-hidden
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover [image-rendering:pixelated]"
        />
      ) : (
        <span className="font-press-start text-sm text-primary retro-glow select-none">
          {initials}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile                                                             */
/* ------------------------------------------------------------------ */

export function Profile({
  name,
  role,
  bio,
  avatar,
  initials,
  location,
  status,
  stats,
  tags,
  links,
  className,
}: ProfileProps) {
  const resolvedInitials = initials ?? deriveInitials(name);
  const statusCfg = status ? statusConfig[status] : null;

  return (
    <article
      className={cn(
        "pixel-corners [--pixel-step:5px] bg-card text-card-foreground",
        "shadow-[inset_0_0_0_2px_color-mix(in_srgb,var(--primary)_30%,transparent)]",
        "flex flex-col gap-5 p-5",
        className,
      )}
    >
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between">
        <span className="font-press-start text-[0.5rem] text-warning tracking-widest">
          ▸ P1
        </span>
        {statusCfg && (
          <div className="flex items-center gap-1.5">
            {/* pulsing status dot */}
            <span
              aria-hidden
              className={cn(
                "status-dot h-2 w-2 rounded-full",
                statusCfg.dotClass,
                status === "online" && "status-dot--pulse",
              )}
            />
            <span
              className={cn(
                "font-press-start text-[0.45rem]",
                statusCfg.textClass,
              )}
            >
              {statusCfg.label}
            </span>
          </div>
        )}
      </div>

      {/* ── Identity row ── */}
      <div className="flex gap-4">
        <Avatar src={avatar} initials={resolvedInitials} name={name} />

        <div className="flex min-w-0 flex-col justify-center gap-1.5">
          <h2 className="font-press-start text-sm leading-snug text-primary retro-glow">
            {name}
          </h2>
          <p className="text-sm text-muted-foreground">{role}</p>

          {location && (
            <p className="flex items-center gap-1 text-xs text-accent">
              <MapPin width={12} height={12} aria-hidden />
              {location}
            </p>
          )}
        </div>
      </div>

      {/* ── Bio ── */}
      {bio && (
        <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-3">
          {bio}
        </p>
      )}

      {/* ── Stats ── */}
      {stats && stats.length > 0 && (
        <section aria-label="Stats">
          <h3 className="font-press-start text-[0.5rem] text-primary mb-3 tracking-widest">
            STATS ──────────
          </h3>
          <div className="flex flex-col gap-3">
            {stats.map((s) => (
              <Progress
                key={s.label}
                label={s.label}
                value={s.value}
                variant={s.variant ?? "primary"}
                showValue
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Tags ── */}
      {tags && tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Skills">
          {tags.map((tag) => (
            <li
              key={tag}
              className="font-press-start text-[0.45rem] text-primary border border-primary px-1.5 py-1 [--pixel-step:1px] pixel-corners"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* ── Links ── */}
      {links && links.length > 0 && (
        <nav aria-label="Profile links">
          <ul className="flex flex-wrap gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5",
                    "pixel-corners [--pixel-step:2px]",
                    "border border-border bg-muted",
                    "font-press-start text-[0.45rem] text-muted-foreground",
                    "transition-colors duration-150",
                    "hover:border-primary hover:text-primary hover:bg-card",
                    "focus-visible:outline-none focus-visible:box-shadow-[inset_0_0_0_2px_var(--ring)]",
                  )}
                >
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Preset link helpers — convenience wrappers for common platforms    */
/* ------------------------------------------------------------------ */

export function GithubLink(href: string): ProfileLink {
  return {
    label: "GitHub",
    href,
    icon: <Github width={12} height={12} aria-hidden />,
  };
}

export function LinkedinLink(href: string): ProfileLink {
  return {
    label: "LinkedIn",
    href,
    icon: <Linkedin width={12} height={12} aria-hidden />,
  };
}

export function EmailLink(href: string, label = "Email"): ProfileLink {
  return {
    label,
    href: href.startsWith("mailto:") ? href : `mailto:${href}`,
    icon: <Mail width={12} height={12} aria-hidden />,
  };
}

export function UserIcon() {
  return <User width={12} height={12} aria-hidden />;
}
