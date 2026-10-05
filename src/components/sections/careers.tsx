import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { CareersContent } from "@/data/types";

/**
 * Open roles beside a card about how the team works. Each role links to
 * its `href`: an application form, a job board or the contact page.
 */
export function Careers({ content }: { content: CareersContent }) {
  return (
    <section id="careers" className="scroll-mt-20 py-24">
      <div className="container-page flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} layout="split" />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <div className="relative flex h-full min-h-80 flex-col justify-between gap-10 overflow-hidden rounded-3xl border bg-card p-8">
              <div aria-hidden className="aurora opacity-50" />
              <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative flex flex-col gap-3">
                <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{content.culture.title}</p>
                <p className="font-heading text-2xl font-semibold tracking-tight text-balance">{content.culture.text}</p>
              </div>
              <dl className="relative grid grid-cols-3 gap-4">
                {content.culture.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="order-2 text-xs text-muted-foreground">{stat.label}</dt>
                    <dd className="order-1 font-heading text-3xl font-semibold text-gradient">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <ul className="flex flex-col divide-y border-y">
            {content.jobs.map((job, index) => (
              <Reveal as="li" key={job.title} delay={index * 0.06}>
                <Link href={job.href} className="group flex items-start justify-between gap-6 py-7">
                  <span className="flex flex-col gap-2">
                    <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">{job.team}</span>
                    <span className="font-heading text-xl font-semibold tracking-tight">{job.title}</span>
                    <span className="text-sm text-muted-foreground">{job.meta.join(" · ")}</span>
                    <span className="max-w-xl text-sm text-muted-foreground">{job.description}</span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" aria-hidden />
                    <span className="sr-only">View the role</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
