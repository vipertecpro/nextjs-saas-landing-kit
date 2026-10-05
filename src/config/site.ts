/**
 * Your brand in one place. Everything the header, footer, metadata,
 * sitemap and share images say about the product comes from here.
 */
export const site = {
  name: "Aurora",
  tagline: "Ask your data anything",
  description:
    "Aurora is an AI analyst that connects to your data and answers questions in plain English, with charts, in seconds.",
  // The colour theme: "aurora" (violet), "ocean" (cyan) or "ember" (orange).
  // Themes live in src/app/globals.css.
  theme: "aurora" as "aurora" | "ocean" | "ember",
  // Used for canonical URLs, the sitemap and share images. No trailing slash.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com",
  twitter: "@aurora",
  nav: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
    { label: "Changelog", href: "/changelog" },
    { label: "Blog", href: "/blog" },
  ],
  cta: { label: "Join the waitlist", href: "/waitlist" },
  footer: [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Compare", href: "/compare" },
        { label: "Changelog", href: "/changelog" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Waitlist", href: "/waitlist" },
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
