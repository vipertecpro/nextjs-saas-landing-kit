"use client";

import { Quote } from "lucide-react";
import { useState } from "react";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import type { WallOfLoveContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Testimonials in a masonry layout, with chips to filter them by group and
 * a button to show the rest.
 */
export function WallOfLove({ content }: { content: WallOfLoveContent }) {
  const [filter, setFilter] = useState(content.filters[0]);
  const [expanded, setExpanded] = useState(false);

  const matching = content.items.filter((item) => filter === content.filters[0] || item.group === filter);
  const shown = expanded ? matching : matching.slice(0, content.initial);

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="center">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter testimonials">
        {content.filters.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === name ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/40",
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item) => (
          <li key={item.name} className="mb-4 break-inside-avoid animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none">
            <figure className="flex flex-col gap-4 rounded-2xl border bg-card p-6">
              <Quote className="size-5 text-primary" aria-hidden />
              <blockquote className="text-pretty">{item.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-linear-to-br from-(--accent-1) to-(--accent-2) text-xs font-semibold text-white">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {matching.length > content.initial && (
        <Button variant="outline" size="lg" className="mx-auto" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show fewer" : `Show all ${matching.length}`}
        </Button>
      )}
    </SectionShell>
  );
}
