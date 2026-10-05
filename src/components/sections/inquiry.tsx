import { ArrowUpRight } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { InquiryContent } from "@/data/types";

/**
 * A closing enquiry: a promise on the left, a short form on the right.
 * Submissions go to CONTACT_WEBHOOK_URL (see .env.example).
 */
export function Inquiry({ content }: { content: InquiryContent }) {
  return (
    <section id="inquiry" className="relative isolate scroll-mt-20 overflow-hidden py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--primary)_25%,transparent),transparent_60%)]" />
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} className="mx-0 items-start text-start" />
          <a href={`mailto:${content.email}`} className="group flex w-fit items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium">
            {content.email}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <InquiryForm teamSizes={content.teamSizes} goals={content.goals} submitLabel={content.submitLabel} note={content.note} />
        </Reveal>
      </div>
    </section>
  );
}
