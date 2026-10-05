import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

/**
 * The frame every showcase section shares: the spacing, the page width and
 * the heading. Change the spacing here and every section follows.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  highlight,
  subtitle,
  layout = "split",
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  layout?: "center" | "split";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-24", className)}>
      <div className="container-page flex flex-col gap-12">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} layout={layout} />
        </Reveal>
        {children}
      </div>
    </section>
  );
}
