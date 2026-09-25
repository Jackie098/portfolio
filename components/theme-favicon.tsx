"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { site } from "@/content/site";

function faviconHref(theme: string | undefined) {
  return theme === "light" ? site.faviconLight : site.favicon;
}

export function applyFavicon(theme: string | undefined) {
  const href = faviconHref(theme);
  const links = document.querySelectorAll<HTMLLinkElement>(
    "link[rel='icon'], link[rel='shortcut icon']",
  );

  if (links.length === 0) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = href;
    document.head.appendChild(link);
    return;
  }

  links.forEach((link) => {
    link.media = "";
    link.type = "image/x-icon";
    link.href = href;
  });
}

export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!resolvedTheme) return;
    applyFavicon(resolvedTheme);
  }, [resolvedTheme]);

  return null;
}

export const faviconBootScript = `(function(){try{var stored=localStorage.getItem("theme");var dark=stored==="light"?false:stored==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches:true;var href=dark?"${site.favicon}":"${site.faviconLight}";var links=document.querySelectorAll("link[rel='icon'],link[rel='shortcut icon']");if(!links.length){var created=document.createElement("link");created.rel="icon";created.type="image/x-icon";created.href=href;document.head.appendChild(created);return;}links.forEach(function(link){link.media="";link.type="image/x-icon";link.href=href;});}catch(e){}})();`;
