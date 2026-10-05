"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { VideoContent } from "@/data/types";

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * A video poster drawn in CSS, with chapters beside it. Choosing play or a
 * chapter opens the video full screen, starting at that chapter. Nothing
 * loads from YouTube until a visitor presses play.
 */
export function VideoShowcase({ content }: { content: VideoContent }) {
  const [start, setStart] = useState<number | null>(null);

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-[1fr_16rem]">
          <button
            type="button"
            onClick={() => setStart(0)}
            aria-label={`Play: ${content.title}`}
            className="group relative aspect-video overflow-hidden rounded-2xl border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <div aria-hidden className="aurora opacity-60" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="ms-1 size-8 fill-current" aria-hidden />
              </span>
            </span>
            <span className="absolute start-5 bottom-4 text-start">
              <span className="block font-heading text-lg font-semibold">{content.title}</span>
              <span className="text-sm text-muted-foreground">{content.chapters.length} chapters</span>
            </span>
            <span className="absolute end-4 bottom-4 rounded-md bg-black/70 px-2 py-1 font-mono text-xs text-white">{content.duration}</span>
          </button>

          <ol className="flex flex-col gap-2">
            {content.chapters.map((chapter) => (
              <li key={chapter.seconds}>
                <button
                  type="button"
                  onClick={() => setStart(chapter.seconds)}
                  className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 text-start text-sm transition-colors hover:border-primary/40"
                >
                  <span className="font-mono text-xs text-primary">{formatTime(chapter.seconds)}</span>
                  {chapter.label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Dialog.Root open={start !== null} onOpenChange={(open) => !open && setStart(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed inset-0 z-50 grid place-items-center p-4 outline-none sm:p-10">
            <Dialog.Title className="sr-only">{content.title}</Dialog.Title>
            <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black">
              {content.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${content.youtubeId}?autoplay=1&rel=0&start=${start ?? 0}`}
                  title={content.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="size-full"
                />
              ) : (
                <p className="grid size-full place-items-center p-6 text-center text-sm text-white/70">
                  Your product video plays here. Set its YouTube id as video.youtubeId in src/data/sections.ts.
                </p>
              )}
            </div>
            <Dialog.Close aria-label="Close the video" className="absolute end-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </SectionShell>
  );
}
