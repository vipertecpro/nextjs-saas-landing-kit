import { logos } from "@/content/landing";

/**
 * Customer names as a trust strip. Replace them with logo SVGs when you have
 * permission to show them.
 */
export function LogoCloud() {
  return (
    <section aria-label="Trusted by" className="border-y border-border/60 py-10">
      <div className="container-page flex flex-col items-center gap-6">
        <p className="text-sm text-muted-foreground">Trusted by fast-moving teams at</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <li key={logo} className="text-xl font-semibold tracking-tight text-muted-foreground/70">
              {logo}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
