"use client";

import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { HeroContent } from "@/data/types";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

type Phase = "typing" | "working" | "answering" | "done";

/**
 * The product in action: a question types itself, the agent works through
 * its steps, then the answer streams in with a chart. It plays while on
 * screen, loops, and shows the finished state for visitors who prefer
 * reduced motion. The script is the hero's `demo` in src/data/sections.ts.
 */
export function HeroDemo({ demo }: { demo: HeroContent["demo"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);
  const [stepsDone, setStepsDone] = useState(0);
  const [words, setWords] = useState(0);

  const answerWords = demo.answer.split(" ");
  const maxValue = Math.max(...demo.chart.map((point) => point.value));
  const finished = reduceMotion === true;
  const shownPhase: Phase = finished ? "done" : phase;
  const shownTyped = finished ? demo.question.length : typed;
  const shownSteps = finished ? demo.steps.length : stepsDone;
  const shownWords = finished ? answerWords.length : words;

  useEffect(() => {
    if (finished || !inView) {
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, action: () => void) => timers.push(setTimeout(action, ms));
    let time = 400;

    at(0, () => {
      setPhase("typing");
      setTyped(0);
      setStepsDone(0);
      setWords(0);
    });

    for (let index = 1; index <= demo.question.length; index++) {
      at(time, () => setTyped(index));
      time += 28;
    }

    time += 300;
    at(time, () => setPhase("working"));

    demo.steps.forEach((_, index) => {
      time += 900;
      at(time, () => setStepsDone(index + 1));
    });

    time += 400;
    at(time, () => setPhase("answering"));

    demo.answer.split(" ").forEach((_, index) => {
      time += 45;
      at(time, () => setWords(index + 1));
    });

    time += 300;
    at(time, () => setPhase("done"));
    at(time + 6000, () => setRun((value) => value + 1));

    return () => timers.forEach(clearTimeout);
  }, [run, inView, finished, demo]);

  return (
    <div ref={ref} className="beam-border mx-auto w-full max-w-4xl rounded-2xl shadow-2xl shadow-primary/20">
      <div className="rounded-[15px] bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-primary" aria-hidden />
            Aurora agent
          </span>
        </div>

        <div className="flex flex-col gap-5 p-5 text-left sm:p-6" aria-label={`Example question: ${demo.question}`} role="img">
          <div className="ms-auto max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
            {demo.question.slice(0, shownTyped)}
            {shownPhase === "typing" && <span className="blinking-caret bg-primary-foreground!" />}
          </div>

          {shownPhase !== "typing" && (
            <ul className="flex flex-col gap-2">
              {demo.steps.map((step, index) => {
                const isDone = index < shownSteps;
                const isActive = index === shownSteps && shownPhase === "working";

                if (!isDone && !isActive) {
                  return null;
                }

                return (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    {isDone ? (
                      <Check className="size-4 text-primary" aria-hidden />
                    ) : (
                      <LoaderCircle className="size-4 animate-spin text-primary" aria-hidden />
                    )}
                    {step}
                  </motion.li>
                );
              })}
            </ul>
          )}

          {(shownPhase === "answering" || shownPhase === "done") && (
            <div className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
              <p className="text-sm leading-6">
                {answerWords.slice(0, shownWords).join(" ")}
                {shownPhase === "answering" && <span className="blinking-caret" />}
              </p>
              <div className="flex flex-col gap-2 rounded-xl border bg-background/60 p-4">
                <p className="text-xs font-medium text-muted-foreground">{demo.chartTitle}</p>
                <div className="flex h-32 items-end gap-2">
                  {demo.chart.map((point, index) => {
                    const rising = index >= demo.chart.length - 3;

                    return (
                      <div key={point.label} className="flex h-full flex-1 flex-col items-center gap-1.5">
                        <div className="flex w-full flex-1 items-end">
                          <motion.div
                            className={cn("w-full rounded-t-md", rising ? "bg-linear-to-t from-(--accent-1) to-(--accent-2)" : "bg-muted-foreground/25")}
                            initial={{ height: 0 }}
                            animate={{ height: `${(point.value / maxValue) * 100}%` }}
                            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{point.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
