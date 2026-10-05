"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SectionShell } from "@/components/section-shell";
import type { ScrollStoryContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * Steps on the left scroll past a panel on the right that stays in place
 * and changes to match the step in the middle of the screen. On phones the
 * panel sits under each step instead.
 */
export function ScrollStory({ content }: { content: ScrollStoryContent }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      // Only a thin band across the middle of the screen counts.
      { rootMargin: "-45% 0px -45% 0px" },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const step = content.steps[active];

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ol className="flex flex-col gap-6 lg:gap-[30vh] lg:py-[20vh]">
          {content.steps.map((item, index) => (
            <li
              key={item.title}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              data-index={index}
              className={cn("flex flex-col gap-3 transition-opacity duration-500", index === active ? "lg:opacity-100" : "lg:opacity-35")}
            >
              <span className="font-heading text-sm font-semibold text-primary">0{index + 1}</span>
              <h3 className="font-heading text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              <div className="lg:hidden">
                <StoryPanel step={item} />
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[20vh]">
            <div className="mb-4 flex gap-1.5" aria-hidden>
              {content.steps.map((item, index) => (
                <span key={item.title} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", index <= active ? "bg-primary" : "bg-muted")} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <StoryPanel step={step} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function StoryPanel({ step }: { step: ScrollStoryContent["steps"][number] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-card p-8">
      <div aria-hidden className="aurora opacity-30" />
      <div className="relative flex flex-col gap-6">
        <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Icon name={step.icon} className="size-7" aria-hidden />
        </span>
        <p className="font-heading text-xl font-semibold">{step.title}</p>
        <ul className="flex flex-col gap-3">
          {step.points.map((point) => (
            <li key={point} className="flex items-center gap-3 rounded-xl border bg-background/70 px-4 py-3 text-sm">
              <Check className="size-4 text-primary" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
