import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { CSSProperties } from "react";
import type { Testimonial, TestimonialsContent } from "@/data/types";

/**
 * Two rows of quotes drifting in opposite directions. Hovering pauses them.
 */
export function Testimonials({ content }: { content: TestimonialsContent }) {
  const testimonials = content.items;
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];

  return (
    <section className="py-24">
      <div className="container-page">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} />
        </Reveal>
      </div>
      <div className="mt-14 flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="marquee-mask overflow-hidden">
            <ul className={`marquee gap-4 pe-4 ${rowIndex === 1 ? "marquee-reverse" : ""}`} style={{ "--marquee-duration": "45s" } as CSSProperties}>
              {[...row, ...row].map((testimonial, index) => (
                <li key={index} aria-hidden={index >= row.length} className="w-[22rem] shrink-0">
                  <Quote testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Quote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-5 rounded-2xl border bg-card p-6">
      <blockquote className="text-sm text-pretty">“{testimonial.quote}”</blockquote>
      <figcaption className="flex items-center gap-3">
        <span aria-hidden className="grid size-9 place-items-center rounded-full bg-linear-to-br from-(--accent-1) to-(--accent-2) text-xs font-semibold text-white">
          {testimonial.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold">{testimonial.name}</span>
          <span className="text-xs text-muted-foreground">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
