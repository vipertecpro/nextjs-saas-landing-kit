"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { CodeTabsContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * Code samples in tabs, with a copy button and the response beside them.
 * Strings and comments are coloured with a tiny highlighter below, so no
 * syntax-highlighting library is needed.
 */
export function CodeTabs({ content }: { content: CodeTabsContent }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const tab = content.tabs[active];

  async function copy() {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be blocked; the code can still be selected by hand.
    }
  }

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-100">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 px-2">
              <div role="tablist" aria-label="Language" className="flex">
                {content.tabs.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative px-3 py-3 text-xs font-medium transition-colors",
                      index === active ? "text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-(--primary)" : "text-zinc-400 hover:text-white",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <Code code={tab.code} />
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border bg-zinc-950 text-zinc-100">
            <p className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-xs text-zinc-400">
              <span className="rounded bg-green-500/20 px-1.5 py-0.5 font-mono text-green-400">200</span>
              Response
            </p>
            <Code code={content.response} wrap />
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function Code({ code, wrap = false }: { code: string; wrap?: boolean }) {
  return (
    <pre className={cn("overflow-x-auto p-4 font-mono text-[13px] leading-6", wrap && "whitespace-pre-wrap break-all")}>
      <code>
        {code.split("\n").map((line, index) => (
          <span key={index} className="flex gap-4">
            <span aria-hidden className="w-4 shrink-0 text-end text-zinc-600 select-none">
              {index + 1}
            </span>
            <span>{highlight(line)}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

/** Colours comments, and strings in single or double quotes. */
function highlight(line: string) {
  if (/^\s*(\/\/|#)/.test(line)) {
    return <span className="text-zinc-500">{line}</span>;
  }

  return line.split(/("[^"]*"|'[^']*')/g).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="text-emerald-300">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
