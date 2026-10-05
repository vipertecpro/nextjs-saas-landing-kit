import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { StatusContent } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * A status page in miniature: one bar per day for each service, amber on
 * the days listed as incidents (counted back from today: 0 is today).
 */
export function StatusBoard({ content }: { content: StatusContent }) {
  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border bg-card">
          <p className="flex items-center gap-2 border-b bg-green-500/10 px-6 py-4 font-medium text-green-700 dark:text-green-400">
            <CircleCheck className="size-5" aria-hidden />
            {content.overall}
          </p>

          <ul className="flex flex-col divide-y">
            {content.services.map((service) => (
              <li key={service.name} className="flex flex-col gap-3 px-6 py-5">
                <p className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-muted-foreground tabular-nums">{service.uptime}% uptime</span>
                </p>
                <div className="flex h-8 gap-px" role="img" aria-label={`${service.name}: ${service.incidents.length} incidents in ${content.days} days`}>
                  {Array.from({ length: content.days }, (_, index) => {
                    const daysAgo = content.days - 1 - index;
                    const hadIncident = service.incidents.includes(daysAgo);

                    return (
                      <span
                        key={index}
                        title={hadIncident ? `${daysAgo} days ago: brief incident` : `${daysAgo} days ago: no issues`}
                        className={cn(
                          "flex-1 rounded-[2px] transition-transform hover:scale-y-110",
                          hadIncident ? "bg-amber-400" : "bg-green-500/70",
                          // Phones show the last 45 days.
                          index < content.days / 2 && "hidden sm:block",
                        )}
                      />
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t px-6 py-4 text-xs text-muted-foreground">
            <span>
              <span className="sm:hidden">{content.days / 2}</span>
              <span className="hidden sm:inline">{content.days}</span> days ago
            </span>
            <Link href={content.link.href} className="group flex items-center gap-1 font-medium text-primary">
              {content.link.label}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <span>Today</span>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
