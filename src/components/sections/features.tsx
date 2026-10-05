import { Check, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { site } from "@/config/site";
import type { FeaturesContent } from "@/data/types";
import { Icon } from "@/lib/icons";

/**
 * Features as a bento grid: four large tiles, each with a small live demo,
 * and a row of smaller ones.
 */
export function Features({ content: features }: { content: FeaturesContent }) {
  const { ask, sources, speed, secure } = features;

  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="container-page flex flex-col gap-14">
        <Reveal>
          <SectionHeading eyebrow={features.eyebrow} title={features.title} highlight={features.highlight} subtitle={features.subtitle} />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <SpotlightCard className="h-full p-6">
              <TileHeading icon={<Icon name={ask.icon} className="size-5" />} title={ask.title} description={ask.description} />
              <div aria-hidden className="mt-6 flex flex-col gap-3 rounded-xl border bg-background/60 p-4 text-sm">
                <p className="ms-auto rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground">{ask.question}</p>
                <p className="rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
                  {ask.answer}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0.05}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <TileHeading icon={<Icon name={speed.icon} className="size-5" />} title={speed.title} description={speed.description} />
              <p className="mt-auto pt-8 font-heading text-6xl font-semibold tracking-tight text-gradient">
                <Counter value={speed.value} decimals={speed.decimals} suffix={speed.suffix} />
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.1}>
            <SpotlightCard className="h-full p-6">
              <TileHeading icon={<Icon name={sources.icon} className="size-5" />} title={sources.title} description={sources.description} />
              <Orbit names={sources.names} hub={site.name.charAt(0)} />
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.15}>
            <SpotlightCard className="h-full p-6">
              <TileHeading icon={<Icon name={secure.icon} className="size-5" />} title={secure.title} description={secure.description} />
              <div aria-hidden className="mt-6 flex items-center gap-5 rounded-xl border bg-background/60 p-4">
                <span className="relative grid size-14 shrink-0 place-items-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/20 motion-reduce:animate-none" />
                  <ShieldCheck className="relative size-9 text-primary" />
                </span>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {secure.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>

          {features.more.map((feature, index) => (
            <Reveal key={feature.title} className="md:col-span-3 lg:col-span-3 xl:col-span-3" delay={0.05 * index}>
              <SpotlightCard className="h-full p-6">
                <TileHeading icon={<Icon name={feature.icon} className="size-5" />} title={feature.title} description={feature.description} />
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TileHeading({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/**
 * Data sources circling the product, drawn with CSS.
 */
function Orbit({ names, hub }: { names: string[]; hub: string }) {
  return (
    <div aria-hidden className="relative mx-auto mt-6 grid size-56 place-items-center">
      <div className="absolute inset-0 rounded-full border border-dashed border-border" />
      <div className="absolute inset-10 rounded-full border border-dashed border-border" />
      <div className="grid size-14 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30">{hub}</div>
      <div className="absolute inset-0 animate-[orbit_28s_linear_infinite] motion-reduce:animate-none">
        {names.map((name, index) => {
          const angle = (index / names.length) * 2 * Math.PI;
          const radius = index % 2 === 0 ? 112 : 72;

          return (
            <span
              key={name}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))` }}
            >
              {/* Turns the other way, so the name stays upright as the ring spins. */}
              <span className="block animate-[orbit_28s_linear_infinite_reverse] rounded-full border bg-card px-2.5 py-1 text-[11px] font-medium whitespace-nowrap shadow-sm motion-reduce:animate-none">
                {name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
