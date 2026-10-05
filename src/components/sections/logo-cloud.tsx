import type { CSSProperties } from "react";
import type { LogosContent } from "@/data/types";

/**
 * Customer names scrolling past. Replace them with logo SVGs when you have
 * permission to show them. The list is rendered twice for a seamless loop.
 */
export function LogoCloud({ content }: { content: LogosContent }) {
  const logos = content.names;

  return (
    <section aria-label="Trusted by" className="py-12">
      <p className="mb-8 text-center text-sm text-muted-foreground">{content.caption}</p>
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee gap-14 pe-14" style={{ "--marquee-duration": "35s" } as CSSProperties}>
          {[...logos, ...logos].map((logo, index) => (
            <li key={index} aria-hidden={index >= logos.length} className="shrink-0 text-2xl font-semibold tracking-tight text-muted-foreground/60">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
