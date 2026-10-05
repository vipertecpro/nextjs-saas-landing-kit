"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/section-heading";
import type { DiveContent } from "@/data/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** How far apart the terms are along the dive, in pixels of depth. */
const spacing = 420;

/**
 * A dive through your metrics: scrolling moves the camera forward through
 * a 3D tunnel of terms circling a glowing core, while huge outlined words
 * drift past behind. Built with CSS 3D transforms, so the text stays crisp
 * and selectable. Visitors who prefer less motion see the terms as a grid.
 */
export function Dive({ content }: { content: DiveContent }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const travel = (content.terms.length + 1) * spacing;

  if (reduceMotion) {
    return (
      <section className="py-24">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="split" />
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {content.terms.map((item) => (
              <div key={item.term} className="flex flex-col gap-1 rounded-2xl border bg-card p-5">
                <dt className="font-heading text-2xl font-semibold text-gradient">{item.term}</dt>
                <dd className="text-sm text-muted-foreground">{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${120 + content.terms.length * 22}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_65%)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col justify-around overflow-hidden">
          {content.words.map((word, index) => (
            <DriftingWord key={word} word={word} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <div className="relative z-10 bg-linear-to-b from-background via-background/85 to-transparent pb-16">
          <div className="container-page pt-24">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} className="mx-0 max-w-xl items-start text-start" />
          </div>
        </div>

        <div className="absolute inset-0 [perspective:900px]">
          <div className="absolute top-[58%] left-1/2 [transform-style:preserve-3d]">
            <Core />
            {content.terms.map((item, index) => (
              <Term key={item.term} item={item} index={index} travel={travel} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        <div className="container-page relative z-10 mt-auto flex justify-between pb-8 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          <span>{content.scrollHint} ↓</span>
          <span className="hidden sm:inline">{content.endHint} ↗</span>
        </div>
      </div>
    </section>
  );
}

function DriftingWord({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const direction = index % 2 === 0 ? -1 : 1;
  const x = useTransform(progress, [0, 1], [`${direction * -10}%`, `${direction * 25}%`]);

  return (
    <motion.p style={{ x }} className="text-outline font-heading text-[18vw] leading-none font-bold tracking-tighter whitespace-nowrap uppercase">
      {word}
    </motion.p>
  );
}

function Term({
  item,
  index,
  travel,
  progress,
}: {
  item: DiveContent["terms"][number];
  index: number;
  travel: number;
  progress: MotionValue<number>;
}) {
  // Terms spiral around the core, each one further into the screen.
  const angle = index * 2.4;
  const left = `${Math.cos(angle) * 34}vw`;
  const top = `${Math.sin(angle) * 30}vh`;
  const start = -(index + 1) * spacing;
  const z = useTransform(progress, [0, 1], [start, start + travel]);
  // Fade in from the distance, and out just before passing the camera.
  const opacity = useTransform(z, [-2600, -1400, 0, 500, 760], [0, 0.35, 1, 1, 0]);

  return (
    <motion.div style={{ z, opacity, left, top }} className="absolute w-max max-w-[60vw] -translate-x-1/2 -translate-y-1/2 text-center will-change-transform">
      <p className="font-heading text-5xl font-semibold tracking-tight text-gradient">{item.term}</p>
      <p className="mt-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{item.meaning}</p>
    </motion.div>
  );
}

/** A glowing core with three rings turning in 3D. */
function Core() {
  return (
    <div aria-hidden className="absolute -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]" style={{ transform: "translateZ(-900px)" }}>
      <div className="relative grid size-56 place-items-center [transform-style:preserve-3d]">
        <span className="absolute inset-0 rounded-full bg-primary/40 blur-3xl" />
        <span className="size-20 rounded-full bg-linear-to-br from-(--accent-1) to-(--accent-2) shadow-[0_0_80px_var(--accent-1)]" />
        {[0, 60, 120].map((turn, ring) => (
          <span
            key={turn}
            className="absolute inset-0 rounded-full border-2 border-(--accent-2)/60"
            style={{ animation: `core-ring ${9 + ring * 4}s linear infinite`, ["--turn" as string]: `${turn}deg` }}
          />
        ))}
      </div>
    </div>
  );
}
