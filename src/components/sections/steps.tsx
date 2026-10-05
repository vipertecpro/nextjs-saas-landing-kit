import { SectionHeading } from "@/components/section-heading";
import { steps } from "@/content/landing";

export function Steps() {
  return (
    <section className="py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading eyebrow="How it works" title={steps.title} />
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.items.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-3 rounded-2xl border bg-card p-6">
              <span className="grid size-9 place-items-center rounded-full bg-primary font-semibold text-primary-foreground" aria-hidden>
                {index + 1}
              </span>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
