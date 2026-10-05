import { SectionHeading } from "@/components/section-heading";
import { features } from "@/content/landing";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading eyebrow="Features" title={features.title} subtitle={features.subtitle} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature) => (
            <li key={feature.title} className="flex flex-col gap-3 rounded-2xl border bg-card p-6 transition-colors hover:border-primary/40">
              <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
