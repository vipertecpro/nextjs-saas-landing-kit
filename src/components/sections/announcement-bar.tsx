"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import type { AnnouncementContent } from "@/data/types";
import { useStoredValue } from "@/lib/use-stored-value";

/**
 * A slim bar above the header for launches and news. Closing it hides this
 * announcement for good; a new `id` in src/data/sections.ts shows again.
 */
export function AnnouncementBar({ content }: { content: AnnouncementContent }) {
  const [dismissed, setDismissed] = useStoredValue("announcement-dismissed");

  if (!content.enabled || dismissed === content.id) {
    return null;
  }

  return (
    <div className="relative bg-linear-to-r from-(--accent-1) to-(--accent-2) text-sm text-white">
      <div className="container-page flex items-center justify-center gap-3 py-2 pe-10">
        <span className="hidden rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium sm:inline">{content.label}</span>
        <p className="truncate">{content.text}</p>
        <Link href={content.link.href} className="group flex shrink-0 items-center gap-1 font-medium underline-offset-4 hover:underline">
          {content.link.label}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(content.id)}
        aria-label="Close the announcement"
        className="absolute end-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
