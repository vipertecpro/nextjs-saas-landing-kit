"use client";

import { CornerDownLeft, Search } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { CommandPaletteContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * A working command palette: type to filter, arrow keys to move, Enter to
 * run. Running a command only shows a message, since this is a demo.
 */
export function CommandPalette({ content }: { content: CommandPaletteContent }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [ran, setRan] = useState<string | null>(null);

  const groups = content.groups
    .map((group) => ({ ...group, items: group.items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())) }))
    .filter((group) => group.items.length > 0);
  const flat = groups.flatMap((group) => group.items);
  const current = Math.min(selected, Math.max(flat.length - 1, 0));

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setSelected((current + step + flat.length) % Math.max(flat.length, 1));
    } else if (event.key === "Enter") {
      setRan(flat[current]?.label ?? (query.trim() || null));
    }
  }

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="center">
      <Reveal>
        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-3 border-b px-4">
            <Search className="size-4 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelected(0);
                setRan(null);
              }}
              onKeyDown={onKeyDown}
              placeholder={content.placeholder}
              aria-label="Search commands"
              aria-activedescendant={flat[current] ? `command-${current}` : undefined}
              aria-controls="command-list"
              role="combobox"
              aria-expanded
              className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
          </div>

          <ul id="command-list" role="listbox" className="flex h-80 flex-col overflow-y-auto p-2">
            {groups.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results. Press Enter to ask anyway.</li>}
            {groups.map((group) => (
              <li key={group.heading} role="presentation">
                <p className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">{group.heading}</p>
                <ul role="presentation">
                  {group.items.map((item) => {
                    const index = flat.indexOf(item);

                    return (
                      <li
                        key={item.label}
                        id={`command-${index}`}
                        role="option"
                        aria-selected={index === current}
                        onMouseEnter={() => setSelected(index)}
                        onClick={() => setRan(item.label)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                          index === current && "bg-primary/10 text-foreground",
                        )}
                      >
                        <Icon name={item.icon} className={cn("size-4", index === current ? "text-primary" : "text-muted-foreground")} aria-hidden />
                        <span className="flex-1">{item.label}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{item.hint}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2 border-t px-4 py-2.5 text-xs text-muted-foreground" aria-live="polite">
            <CornerDownLeft className="size-3.5" aria-hidden />
            {ran ? `Running “${ran}”…` : "Use ↑ ↓ to move, Enter to run"}
          </p>
        </div>
      </Reveal>
    </SectionShell>
  );
}
