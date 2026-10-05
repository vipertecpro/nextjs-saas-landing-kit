import { cn } from "@/lib/utils";

/**
 * The eyebrow, title and subtitle that open most sections. The eyebrow is
 * numbered automatically in page order ("03 / Pricing"), and `highlight`
 * adds a second, coloured line to the title. "split" puts the title on the
 * left and the subtitle on the right on wide screens.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  className,
  layout = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  layout?: "center" | "split";
  as?: "h1" | "h2";
}) {
  const heading = (
    <Heading className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
      {title}
      {highlight && (
        <>
          {" "}
          <span className="block text-gradient">{highlight}</span>
        </>
      )}
    </Heading>
  );
  const label = eyebrow && <p className="section-eyebrow font-mono text-xs tracking-[0.2em] text-primary uppercase">{eyebrow}</p>;

  if (layout === "split") {
    return (
      <div className={cn("grid w-full gap-6 lg:grid-cols-[3fr_2fr] lg:items-end", className)}>
        <div className="flex flex-col gap-4">
          {label}
          {heading}
        </div>
        {subtitle && <p className="text-lg text-pretty text-muted-foreground lg:pb-2">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col items-center gap-4 text-center", className)}>
      {label}
      {heading}
      {subtitle && <p className="max-w-2xl text-lg text-pretty text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
