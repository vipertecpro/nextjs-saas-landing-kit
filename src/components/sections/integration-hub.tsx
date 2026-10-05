import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import type { IntegrationHubContent } from "@/data/types";

/**
 * Sources on the left and destinations on the right, joined to the product
 * in the middle by lines with data flowing along them. Pure CSS and SVG.
 * On phones the three columns stack.
 */
export function IntegrationHub({ content }: { content: IntegrationHubContent }) {
  const rowY = (index: number, count: number) => ((index + 0.5) / count) * 100;

  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <div className="relative mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 md:h-96 md:grid-cols-[1fr_2fr_1fr] md:gap-0">
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full md:block">
            {content.sources.map((name, index) => (
              <FlowLine key={name} from={[22, rowY(index, content.sources.length)]} to={[50, 50]} delay={index * 0.4} />
            ))}
            {content.destinations.map((name, index) => (
              <FlowLine key={name} from={[50, 50]} to={[78, rowY(index, content.destinations.length)]} delay={1 + index * 0.4} />
            ))}
          </svg>

          <NodeColumn names={content.sources} />

          <div className="relative grid place-items-center">
            <span aria-hidden className="absolute size-40 animate-pulse rounded-full bg-primary/15 blur-2xl motion-reduce:animate-none" />
            <div className="beam-border rounded-3xl">
              <div className="grid size-28 place-items-center rounded-[23px] bg-card font-heading text-lg font-semibold">{content.hub}</div>
            </div>
          </div>

          <NodeColumn names={content.destinations} />
        </div>
      </Reveal>
    </SectionShell>
  );
}

function NodeColumn({ names }: { names: string[] }) {
  return (
    <ul className="relative flex flex-wrap justify-center gap-3 md:h-full md:flex-col md:flex-nowrap md:justify-around">
      {names.map((name) => (
        <li key={name} className="rounded-xl border bg-card px-4 py-2.5 text-center text-sm font-medium shadow-sm">
          {name}
        </li>
      ))}
    </ul>
  );
}

function FlowLine({ from, to, delay }: { from: [number, number]; to: [number, number]; delay: number }) {
  const middle = (from[0] + to[0]) / 2;
  const path = `M ${from[0]} ${from[1]} C ${middle} ${from[1]}, ${middle} ${to[1]}, ${to[0]} ${to[1]}`;

  return (
    <g fill="none" vectorEffect="non-scaling-stroke">
      <path d={path} stroke="var(--border)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={path}
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 94"
        pathLength={100}
        vectorEffect="non-scaling-stroke"
        className="animate-[flow_2.4s_linear_infinite] motion-reduce:hidden"
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  );
}
