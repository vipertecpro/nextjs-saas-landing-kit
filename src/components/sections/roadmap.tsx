"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { RoadmapContent } from "@/data/types";
import { useStoredValue } from "@/lib/use-stored-value";
import { cn } from "@/lib/utils";

/**
 * A three-column roadmap with vote buttons. Votes are sent to
 * POST /api/roadmap, and the visitor's browser remembers what they voted
 * for so they can take a vote back.
 */
export function Roadmap({ content }: { content: RoadmapContent }) {
  const [stored, setStored] = useStoredValue("roadmap-votes");
  const voted = new Set(stored ? stored.split(",") : []);
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(content.columns.flatMap((column) => column.items.map((item) => [item.id, item.votes]))),
  );

  async function toggle(id: string) {
    const vote = !voted.has(id);
    const next = new Set(voted);

    if (vote) {
      next.add(id);
    } else {
      next.delete(id);
    }

    // Show the vote straight away, then use the count the server returns.
    setStored([...next].join(","));
    setCounts((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + (vote ? 1 : -1)) }));

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, vote }),
      });

      if (response.ok) {
        const result = (await response.json()) as { id: string; votes: number };
        setCounts((current) => ({ ...current, [result.id]: result.votes }));
      }
    } catch {
      // Offline: the vote stays counted on this screen only.
    }
  }

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <div className="grid gap-4 md:grid-cols-3">
        {content.columns.map((column, columnIndex) => (
          <Reveal key={column.title} delay={columnIndex * 0.08}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border bg-muted/30 p-3">
              <p className="flex items-center gap-2 px-2 pt-1 text-sm font-medium">
                <span className={cn("size-2 rounded-full", ["bg-primary", "bg-amber-400", "bg-muted-foreground/50"][columnIndex % 3])} />
                {column.title}
              </p>
              {column.items.map((item) => {
                const hasVoted = voted.has(item.id);

                return (
                  <div key={item.id} className="flex gap-3 rounded-xl border bg-card p-4">
                    <button
                      type="button"
                      onClick={() => void toggle(item.id)}
                      aria-pressed={hasVoted}
                      aria-label={`Vote for ${item.title}`}
                      className={cn(
                        "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border text-xs font-medium tabular-nums transition-colors",
                        hasVoted ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50",
                      )}
                    >
                      <ChevronUp className="size-4" aria-hidden />
                      {counts[item.id] ?? item.votes}
                    </button>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
