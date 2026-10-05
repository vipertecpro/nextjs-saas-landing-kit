import { Check } from "lucide-react";
import { highlights } from "@/content/landing";

/**
 * Deeper looks at the two most important features, alternating sides.
 */
export function Highlights() {
  return (
    <section className="py-12">
      <div className="container-page flex flex-col gap-20">
        {highlights.map((highlight, index) => (
          <div key={highlight.title} className="grid items-center gap-10 lg:grid-cols-2">
            <div className={`flex flex-col gap-4 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <p className="flex items-center gap-2 text-sm font-medium text-primary">
                <highlight.icon className="size-4" aria-hidden />
                {highlight.eyebrow}
              </p>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">{highlight.title}</h2>
              <p className="text-lg text-muted-foreground">{highlight.description}</p>
              <ul className="mt-2 flex flex-col gap-2">
                {highlight.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check className="size-4 text-primary" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-linear-to-br from-primary/15 via-card to-card p-8">
              <div className="flex h-full flex-col justify-end gap-3">
                {[72, 54, 88, 40, 64].map((width, bar) => (
                  <div key={bar} className="h-6 rounded-md bg-primary/25" style={{ width: `${width}%` }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
