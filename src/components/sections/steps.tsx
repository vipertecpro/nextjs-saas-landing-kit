import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import type { StepsContent } from "@/data/types";

export function Steps({ content: steps }: { content: StepsContent }) {
  return (
    <section className="py-24">
      <div className="container-page flex flex-col gap-14">
        <Reveal>
          <SectionHeading eyebrow={steps.eyebrow} title={steps.title} highlight={steps.highlight} subtitle={steps.subtitle} />
        </Reveal>
        <ol className="relative grid gap-6 md:grid-cols-3">
          <div aria-hidden className="absolute top-5 right-[16%] left-[16%] hidden h-px bg-linear-to-r from-transparent via-primary/50 to-transparent md:block" />
          {steps.items.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.12} className="relative flex flex-col items-center gap-3 text-center">
              <span className="relative z-10 grid size-10 place-items-center rounded-full bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/30" aria-hidden>
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
