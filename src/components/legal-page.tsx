import type { ReactNode } from "react";

/**
 * Layout for the privacy policy and terms. The text in those pages is a
 * starting point only: have it checked for your business and country.
 */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="py-20">
      <div className="container-page flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">Last updated {updated}</p>
        </header>
        <div className="prose-page">{children}</div>
      </div>
    </article>
  );
}
