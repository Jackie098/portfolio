"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "pixelarticons/react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Alternar tema claro e escuro"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun width={24} height={24} className="hidden dark:block" aria-hidden />
      <Moon width={24} height={24} className="dark:hidden" aria-hidden />
    </Button>
  );
}
