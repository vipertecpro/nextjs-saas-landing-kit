"use client";

import { LayoutGrid, Palette } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const themes = [
  { id: "aurora", label: "Aurora", swatch: "oklch(0.62 0.24 290)" },
  { id: "ocean", label: "Ocean", swatch: "oklch(0.65 0.15 210)" },
  { id: "ember", label: "Ember", swatch: "oklch(0.66 0.21 30)" },
] as const;

/**
 * A floating colour-theme switcher for the live demo, so visitors can see
 * every theme. Shown only when NEXT_PUBLIC_DEMO_MODE=true; your own site
 * uses the theme set in src/config/site.ts.
 */
export function ThemePicker() {
  // The choice is remembered between visits. The list only renders once
  // opened, so reading it here never changes the server-rendered markup.
  const [theme, setTheme] = useState<string>(() =>
    typeof window === "undefined" ? site.theme : (window.localStorage.getItem("demo-theme") ?? site.theme),
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("demo-theme", theme);
  }, [theme]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      {open && (
        <div role="radiogroup" aria-label="Colour theme" className="flex gap-1 rounded-full border bg-background/90 p-1 shadow-lg backdrop-blur">
          {themes.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={theme === option.id}
              onClick={() => setTheme(option.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors",
                theme === option.id ? "bg-muted font-medium" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span aria-hidden className="size-3 rounded-full" style={{ background: option.swatch }} />
              {option.label}
            </button>
          ))}
        </div>
      )}
      <Link
        href="/components"
        className="flex items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur hover:bg-muted"
      >
        <LayoutGrid className="size-4 text-primary" aria-hidden />
        All sections
      </Link>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border bg-background/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur hover:bg-muted"
      >
        <Palette className="size-4 text-primary" aria-hidden />
        Try a theme
      </button>
    </div>
  );
}
