import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import type { StatsContent } from "@/data/types";

export function Stats({ content }: { content: StatsContent }) {
  return (
    <section aria-label={content.label} className="py-16">
      <Reveal className="container-page">
        <dl className="grid grid-cols-2 gap-8 rounded-3xl border bg-card p-8 lg:grid-cols-4">
          {content.items.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 text-center">
              <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 font-heading text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
