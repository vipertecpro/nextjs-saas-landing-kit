import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/section-shell";
import { BarChart3D } from "@/components/three/lazy";
import type { Chart3DContent } from "@/data/types";

/**
 * A 3D bar chart of the data in src/data/sections.ts (chart3d). The canvas
 * is decorative for screen readers, which get the same numbers as a table.
 */
export function Chart3D({ content }: { content: Chart3DContent }) {
  return (
    <SectionShell eyebrow={content.eyebrow} title={content.title} highlight={content.highlight} subtitle={content.subtitle}>
      <Reveal>
        <figure className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-card">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <BarChart3D className="relative h-[26rem] w-full cursor-grab active:cursor-grabbing sm:h-[32rem]" rows={content.rows} columns={content.columns} values={content.values} unit={content.unit} />
          <figcaption className="relative border-t px-6 py-4 text-sm text-muted-foreground">{content.caption}</figcaption>
          <table className="sr-only">
            <caption>{content.caption}</caption>
            <thead>
              <tr>
                <th scope="col">Day</th>
                {content.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.values.map((row, rowIndex) => (
                <tr key={content.rows[rowIndex]}>
                  <th scope="row">{content.rows[rowIndex]}</th>
                  {row.map((value, columnIndex) => (
                    <td key={content.columns[columnIndex]}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </Reveal>
    </SectionShell>
  );
}
