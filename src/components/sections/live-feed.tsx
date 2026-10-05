"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { ActivityEvent, LiveFeedContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const visibleItems = 5;

/**
 * A feed that starts with the events it was rendered with, then asks
 * /api/activity for something new every few seconds while it is on screen,
 * sliding each new event in at the top.
 */
export function LiveFeed({ content }: { content: LiveFeedContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [events, setEvents] = useState<(ActivityEvent & { receivedAt: number })[]>(() =>
    content.events.slice(0, visibleItems).map((event, index) => ({ ...event, receivedAt: -index * 2 })),
  );

  useEffect(() => {
    if (!inView || reduceMotion) {
      return;
    }

    const controller = new AbortController();
    let minute = 0;

    const timer = setInterval(async () => {
      try {
        const response = await fetch("/api/activity", { signal: controller.signal, cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const event = (await response.json()) as ActivityEvent;
        minute += 1;

        setEvents((current) =>
          current.some((item) => item.id === event.id) ? current : [{ ...event, receivedAt: minute }, ...current].slice(0, visibleItems),
        );
      } catch {
        // Offline or the request was cancelled: try again on the next tick.
      }
    }, content.interval);

    return () => {
      clearInterval(timer);
      controller.abort();
    };
  }, [inView, reduceMotion, content.interval]);

  const newest = events[0]?.receivedAt ?? 0;

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="center">
      <Reveal>
        <div ref={ref} className="mx-auto w-full max-w-xl rounded-2xl border bg-card p-2">
          <p className="flex items-center gap-2 px-4 pt-3 pb-2 text-xs font-medium text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-green-500" />
            </span>
            {content.label}
          </p>
          <ul className="flex flex-col">
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <motion.li
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: -16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 odd:bg-muted/40"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={event.icon} className="size-4" />
                  </span>
                  <p className="min-w-0 flex-1 text-sm">
                    <span className="font-medium">{event.team}</span> <span className="text-muted-foreground">{event.text}</span>
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                    {event.receivedAt === newest ? "now" : `${(newest - event.receivedAt) * 2}m`}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Reveal>
    </SectionShell>
  );
}
