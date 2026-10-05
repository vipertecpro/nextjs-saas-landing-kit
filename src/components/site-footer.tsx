import Link from "next/link";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">{site.description}</p>
          <NewsletterForm compact />
        </div>
        {site.footer.map((column) => (
          <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-2.5">
            <h2 className="text-sm font-semibold">{column.heading}</h2>
            {column.links.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit rounded-sm text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="container-page flex flex-col gap-3 border-t border-border/60 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <ul className="flex gap-4">
          {site.social.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-sm hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
