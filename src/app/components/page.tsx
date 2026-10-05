import type { Metadata } from "next";
import { Fragment } from "react";
import { SectionBlock } from "@/components/section-block";
import { type PageSectionId, sections } from "@/components/sections/registry";

export const metadata: Metadata = {
  title: "All sections",
  description: "Every section in the kit, ready to drop into a page.",
  robots: { index: false },
};

/**
 * Every section in the kit on one page, each labelled with its file and
 * where its words live. Handy while designing; keep it out of your
 * navigation (it isn't indexed by search engines).
 */
export default function ComponentsPage() {
  const entries = Object.entries(sections) as [PageSectionId, (typeof sections)[PageSectionId]][];

  return (
    <>
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {entries.length + 1} sections, <span className="text-gradient">ready to use</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Each one is a single file in src/components/sections that loads its content from {"/api/sections/{id}"}. Put any of them on the landing page by adding its id
          to src/config/home.ts. The announcement bar at the very top is number {entries.length + 1}.
        </p>
        <nav aria-label="Sections" className="flex max-w-4xl flex-wrap justify-center gap-2">
          {entries.map(([id, section], index) => (
            <a key={id} href={`#section-${id}`} className="rounded-full border bg-card px-3 py-1 text-sm transition-colors hover:border-primary/50">
              <span className="text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span> {section.name}
            </a>
          ))}
        </nav>
      </div>

      {entries.map(([id, section], index) => {
        return (
          <Fragment key={id}>
            <div id={`section-${id}`} className="scroll-mt-16 border-y bg-muted/40">
              <div className="container-page flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm">
                <span className="font-heading font-semibold text-primary tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-medium">{section.name}</span>
                <span className="text-muted-foreground">{section.description}</span>
                <span className="ms-auto flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  <code className="rounded bg-background px-1.5 py-0.5">id: {id}</code>
                  <code className="rounded bg-background px-1.5 py-0.5">{section.file}</code>
                  <code className="rounded bg-background px-1.5 py-0.5">/api/sections/{id}</code>
                </span>
              </div>
            </div>
            <SectionBlock id={id} />
          </Fragment>
        );
      })}
    </>
  );
}
