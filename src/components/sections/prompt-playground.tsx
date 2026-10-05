"use client";

import { Sparkles } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { PlaygroundContent } from "@/data/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Visitors choose a question; the answer streams in word by word, then the
 * numbers that back it up appear. Questions live in src/data/sections.ts.
 */
export function PromptPlayground({ content }: { content: PlaygroundContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [words, setWords] = useState(0);

  const prompt = content.prompts[active];
  const answerWords = prompt.answer.split(" ");
  const shownWords = reduceMotion ? answerWords.length : words;
  const finished = shownWords >= answerWords.length;

  useEffect(() => {
    if (!inView || reduceMotion) {
      return;
    }

    const count = content.prompts[active].answer.split(" ").length;
    const timers = [setTimeout(() => setWords(0), 0)];

    for (let index = 1; index <= count; index++) {
      timers.push(setTimeout(() => setWords(index), 450 + index * 55));
    }

    return () => timers.forEach(clearTimeout);
  }, [active, inView, reduceMotion, content]);

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div ref={ref} className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-[18rem_1fr]">
          <div role="tablist" aria-label="Example questions" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {content.prompts.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "flex min-w-56 flex-col gap-1 rounded-xl border p-4 text-start transition-colors lg:min-w-0",
                  index === active ? "border-primary/60 bg-primary/5" : "bg-card hover:border-primary/30",
                )}
              >
                <span className="text-xs font-medium text-primary">{item.label}</span>
                <span className="text-sm">{item.question}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:p-6">
            <p className="ms-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{prompt.question}</p>

            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <p className="min-h-12 pt-1 text-sm leading-6" aria-live="polite">
                {answerWords.slice(0, shownWords).join(" ")}
                {!finished && <span className="blinking-caret" />}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {prompt.metrics.map((metric, index) => (
                <div
                  key={`${active}-${metric.label}`}
                  className={cn(
                    "rounded-xl border bg-background/60 p-4 transition-all duration-500",
                    finished ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  )}
                  style={{ transitionDelay: finished ? `${index * 90}ms` : "0ms" }}
                >
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 font-heading text-2xl font-semibold">{metric.value}</p>
                  <p className="text-xs font-medium text-primary">{metric.change}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
