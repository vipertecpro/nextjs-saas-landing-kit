"use client";

import { Check, GripVertical, Sparkles } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { BeforeAfterContent } from "@/data/types";

/**
 * Two scenes stacked on top of each other; the handle wipes between them.
 * The handle is a real range input, so it works with the keyboard and
 * screen readers too.
 */
export function BeforeAfter({ content }: { content: BeforeAfterContent }) {
  const [position, setPosition] = useState(50);

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-4xl overflow-hidden rounded-2xl border bg-card select-none sm:aspect-[16/9]">
          <BeforeScene content={content.before} />

          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
            <AfterScene content={content.after} />
          </div>

          <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary" style={{ left: `${position}%` }}>
            <span className="absolute top-1/2 left-1/2 grid size-9 -translate-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <GripVertical className="size-4" />
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label={`Compare ${content.before.label} and ${content.after.label}`}
            className="absolute inset-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
      </Reveal>
    </SectionShell>
  );
}

function SceneLabel({ children, className }: { children: string; className: string }) {
  return <span className={`absolute top-4 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur ${className}`}>{children}</span>;
}

/** A crowded spreadsheet with sticky notes. */
function BeforeScene({ content }: { content: BeforeAfterContent["before"] }) {
  return (
    <div className="absolute inset-0 bg-muted/40 p-6">
      <div aria-hidden className="grid h-full grid-cols-6 grid-rows-10 gap-px overflow-hidden rounded-lg border bg-border opacity-70">
        {Array.from({ length: 60 }, (_, index) => (
          <span key={index} className={index % 7 === 3 ? "bg-red-500/15" : index % 11 === 5 ? "bg-amber-500/20" : "bg-background"} />
        ))}
      </div>
      {content.notes.map((note, index) => (
        <p
          key={note}
          className="absolute max-w-44 rounded-md bg-amber-200 px-3 py-2 text-xs font-medium text-amber-950 shadow-md"
          style={{ top: `${18 + index * 24}%`, left: `${8 + (index % 2) * 18}%`, rotate: `${index % 2 ? 3 : -4}deg` }}
        >
          {note}
        </p>
      ))}
      <SceneLabel className="start-4">{content.label}</SceneLabel>
    </div>
  );
}

/** The same question answered cleanly. */
function AfterScene({ content }: { content: BeforeAfterContent["after"] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-end bg-card p-6 sm:p-10">
      <div className="aurora opacity-30" aria-hidden />
      <div className="relative flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-background/90 p-5 shadow-xl backdrop-blur">
        <p className="ms-auto rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">{content.question}</p>
        <div className="flex gap-2 text-sm">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          <p>{content.answer}</p>
        </div>
        <div aria-hidden className="flex h-16 items-end gap-1.5">
          {[40, 55, 48, 62, 70, 86].map((height, index) => (
            <span key={index} className="flex-1 rounded-t bg-linear-to-t from-(--accent-1) to-(--accent-2)" style={{ height: `${height}%` }} />
          ))}
        </div>
        <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
          {content.points.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <Check className="size-3.5 text-primary" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <SceneLabel className="end-4">{content.label}</SceneLabel>
    </div>
  );
}
