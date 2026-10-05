import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/content/landing";

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading eyebrow="Loved by teams" title="Don't just take our word for it" />
        <ul className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name}>
              <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border bg-card p-6">
                <blockquote className="text-pretty">“{testimonial.quote}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span aria-hidden className="grid size-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{testimonial.name}</span>
                    <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
