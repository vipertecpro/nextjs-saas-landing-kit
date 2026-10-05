import { Check, X } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { SectionBlock } from "@/components/section-block";
import { SectionHeading } from "@/components/section-heading";
import { getComparison } from "@/lib/api";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const comparison = await getComparison();

  return { title: "Compare", description: comparison.subtitle, alternates: { canonical: "/compare" } };
}

function Value({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-5 text-primary" aria-hidden />
        <span className="sr-only">Yes</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <X className="mx-auto size-5 text-muted-foreground/50" aria-hidden />
        <span className="sr-only">No</span>
      </>
    );
  }

  return <span className="text-sm">{value}</span>;
}

export default async function ComparePage() {
  const comparison = await getComparison();

  return (
    <>
      <section className="py-20">
        <div className="container-page flex flex-col gap-12">
          <Reveal>
            <SectionHeading as="h1" eyebrow={comparison.eyebrow} title={comparison.title} subtitle={comparison.subtitle} />
          </Reveal>
          <Reveal className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full min-w-[640px] border-collapse text-center">
              <caption className="sr-only">{comparison.title}</caption>
              <thead>
                <tr className="border-b">
                  <th scope="col" className="p-4 text-start text-sm font-medium text-muted-foreground">
                    Feature
                  </th>
                  {comparison.columns.map((column, index) => (
                    <th key={column} scope="col" className={cn("p-4 text-sm font-semibold", index === 0 && "bg-primary/10 text-primary")}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <th scope="row" className="p-4 text-start text-sm font-medium">
                      {row.feature}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={index} className={cn("p-4", index === 0 && "bg-primary/5 font-medium")}>
                        <Value value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
      <SectionBlock id="cta" />
    </>
  );
}
