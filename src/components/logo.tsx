import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The brand mark and name. Swap the square for your own SVG.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 rounded-md font-semibold tracking-tight", className)}>
      <span aria-hidden className="grid size-7 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        {site.name.charAt(0)}
      </span>
      <span>{site.name}</span>
    </Link>
  );
}
