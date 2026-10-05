import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Globe } from "@/components/three/lazy";
import type { GlobeContent } from "@/data/types";

/**
 * A 3D globe visitors can spin, beside the numbers that make it real.
 */
export function GlobeSection({ content }: { content: GlobeContent }) {
  return (
    <section className="overflow-hidden py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-10">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle} className="items-start text-start lg:mx-0" />
          <dl className="grid grid-cols-2 gap-4">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 rounded-2xl border bg-card p-5">
                <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-heading text-3xl font-semibold tracking-tight text-gradient">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="relative aspect-square w-full cursor-grab active:cursor-grabbing">
          <div aria-hidden className="absolute inset-[15%] rounded-full bg-primary/20 blur-3xl" />
          <Globe interactive className="size-full" />
        </div>
      </div>
    </section>
  );
}
