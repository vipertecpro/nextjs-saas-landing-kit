"use client";

import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { UseCasesContent } from "@/data/types";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

/**
 * One product, explained for each kind of visitor: pick a role to see the
 * questions people in that role ask and what they get back.
 */
export function UseCases({ content }: { content: UseCasesContent }) {
  const [active, setActive] = useState(0);
  const role = content.roles[active];

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="center">
      <Reveal>
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
          <div role="tablist" aria-label="Roles" className="flex flex-wrap justify-center gap-1 rounded-full border bg-card p-1">
            {content.roles.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  index === active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon name={item.icon} className="size-4" aria-hidden />
                {item.label}
              </button>
            ))}
          </div>

          <div key={active} role="tabpanel" className="grid w-full animate-in gap-6 duration-500 fade-in zoom-in-[0.98] md:grid-cols-[1fr_14rem]">
            <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 sm:p-8">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">{role.headline}</h3>
              <ul className="flex flex-col gap-2">
                {role.questions.map((question, index) => (
                  <li
                    key={question}
                    className="flex animate-in items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-sm fill-mode-both fade-in slide-in-from-left-2"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <MessageSquareText className="size-4 shrink-0 text-primary" aria-hidden />
                    {question}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex flex-col justify-end gap-1 overflow-hidden rounded-2xl border bg-card p-6">
              <div aria-hidden className="aurora opacity-40" />
              <p className="relative font-heading text-5xl font-semibold tracking-tight text-gradient">{role.metric.value}</p>
              <p className="relative text-sm text-muted-foreground">{role.metric.label}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
