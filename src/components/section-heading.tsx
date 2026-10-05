import { cn } from "@/lib/utils";

/**
 * The eyebrow, title and subtitle that open most sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mx-auto flex max-w-2xl flex-col items-center gap-3 text-center", className)}>
      {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
      <Heading className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</Heading>
      {subtitle && <p className="text-lg text-pretty text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
