/**
 * Your brand in one place. Everything the header, footer, metadata,
 * sitemap and share images say about the product comes from here.
 */
export const site = {
  name: "Launchpad",
  tagline: "Ship your SaaS landing page this afternoon",
  description:
    "Launchpad helps small teams plan, build and ship product updates faster, with roadmaps, feedback and release notes in one calm workspace.",
  // Used for canonical URLs, the sitemap and share images. No trailing slash.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com",
  twitter: "@launchpad",
  nav: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Start free trial", href: "/signup" },
  footer: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  social: [
    { label: "X (Twitter)", href: "https://x.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export type NavLink = { label: string; href: string };
