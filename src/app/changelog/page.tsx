import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/config/site";
import { getChangelog } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Everything new in ${site.name}, release by release.`,
  alternates: { canonical: "/changelog" },
};

export default async function ChangelogPage() {
  const changelog = await getChangelog();

  return (
    <section className="py-20">
      <div className="container-page flex max-w-3xl flex-col gap-14">
        <Reveal>
          <SectionHeading as="h1" eyebrow="Changelog" title="What's new" subtitle={`Every improvement to ${site.name}, newest first.`} />
        </Reveal>
        <ol className="relative flex flex-col gap-12 border-s ps-8">
          {changelog.map((release, index) => (
            <Reveal as="li" key={release.version} delay={index * 0.05} className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[2.4rem] size-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">v{release.version}</span>
                <time dateTime={release.date}>{formatDate(release.date)}</time>
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{release.title}</h2>
              <ul className="mt-4 flex list-disc flex-col gap-2 ps-5 text-muted-foreground">
                {release.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
