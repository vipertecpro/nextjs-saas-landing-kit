"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { TabbedShowcaseContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Feature tabs that move on by themselves. The bar under the open tab is a
 * CSS animation; when it ends, the next tab opens. Hovering pauses it, and
 * visitors who prefer reduced motion choose tabs themselves.
 */
export function TabbedShowcase({ content }: { content: TabbedShowcaseContent }) {
  const [active, setActive] = useState(0);
  const tab = content.tabs[active];

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="center">
      <Reveal>
        <div className="group/showcase mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div role="tablist" aria-label={content.title} className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {content.tabs.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "relative flex items-center gap-2 overflow-hidden rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                  index === active ? "border-primary/50 bg-card" : "bg-card/50 text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon name={item.icon} className={cn("size-4", index === active && "text-primary")} aria-hidden />
                {item.label}
                {index === active && (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={() => setActive((active + 1) % content.tabs.length)}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary group-hover/showcase:[animation-play-state:paused] motion-reduce:hidden"
                    // Longhand, so the hover pause above still applies.
                    style={{
                      animationName: "progress",
                      animationDuration: `${content.interval}ms`,
                      animationTimingFunction: "linear",
                      animationFillMode: "forwards",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div key={active} role="tabpanel" className="grid animate-in items-center gap-8 rounded-2xl border bg-card p-6 duration-500 fade-in slide-in-from-bottom-2 sm:p-10 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">{tab.title}</h3>
              <p className="text-muted-foreground">{tab.description}</p>
            </div>
            <ul className="relative flex flex-col gap-3 overflow-hidden rounded-xl border bg-background/60 p-4">
              <div aria-hidden className="aurora opacity-20" />
              {tab.preview.map((row) => (
                <li key={row.label} className="relative flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-heading font-semibold">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
