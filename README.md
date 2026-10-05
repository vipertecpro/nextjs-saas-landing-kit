# Next.js SaaS Landing Kit

A complete marketing site for a SaaS product, ready to rebrand and deploy:
landing page, pricing, blog, about, contact, and log-in / sign-up screens.
Built on **Next.js 16**, **React 19**, **Tailwind CSS 4** and **shadcn/ui**,
with dark mode, SEO and accessibility done for you.

Every page is pre-rendered as static HTML, so it is fast and can be hosted
anywhere that runs Node.js, or on Vercel's free tier.

## What's inside

- **Landing page** with 11 sections: hero with a product mock-up, logo strip,
  features grid, feature highlights, stats, how it works, testimonials,
  pricing, FAQ, call to action and newsletter sign-up.
- **Pricing page** with a monthly / yearly switch and a highlighted plan.
- **Blog** with an index, post pages and three sample posts.
- **About, Contact, Privacy and Terms** pages.
- **Log in, sign up and reset password** screens, ready to connect to your
  authentication provider.
- **Dark mode** that follows the visitor's system, with a toggle.
- **SEO**: page titles and descriptions, canonical links, `sitemap.xml`,
  `robots.txt`, generated social-share images and favicon, and structured data
  for the FAQ and blog posts.
- **Working forms**: newsletter and contact forms with server-side validation
  and spam protection, sending submissions to any webhook.
- **Accessible**: keyboard friendly, skip link, labelled controls, and
  reduced-motion support.
- **Responsive** down to 320px wide, with a slide-out menu on phones.

## Requirements

- Node.js 20.9 or newer
- npm (or pnpm / yarn / bun)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Make it yours

Almost everything you'll want to change lives in two files:

| File | What it holds |
| --- | --- |
| `src/config/site.ts` | Product name, tagline, description, site URL, email, navigation, footer links and social links |
| `src/content/landing.ts` | Every word on the landing page: hero, features, highlights, stats, steps, testimonials, pricing plans, FAQs and the call to action |

Then:

- **Brand colour:** change `--primary` in the `:root` (light) and `.dark`
  blocks of `src/app/globals.css`. Buttons, links, badges and highlights all
  follow it.
- **Logo:** edit `src/components/logo.tsx` (and `src/app/icon.tsx` for the
  browser tab icon).
- **Product mock-up:** `src/components/app-preview.tsx` draws the product in
  HTML. Swap it for a real screenshot with `next/image` when you have one.
- **Sections:** reorder or remove them in `src/app/page.tsx`.
- **Blog posts:** add entries to `src/content/posts.tsx`. The blog index, post
  pages, sitemap and share images update automatically.
- **Legal pages:** `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`
  contain starting points only. Replace them with text written for your
  business.

## Forms

The newsletter and contact forms are handled on the server in
`src/app/actions.ts`. Each submission is validated, then sent as a JSON `POST`
to the webhook you set:

```bash
NEWSLETTER_WEBHOOK_URL=https://hooks.zapier.com/...
CONTACT_WEBHOOK_URL=https://hooks.slack.com/...
```

Zapier, Make, Slack, Formspree, Resend and most CRMs accept webhooks. Without a
webhook, submissions are printed in the server log, which is handy while you
build. A hidden field turns away most spam bots.

## Authentication

The log-in, sign-up and reset screens are designed and ready, but not
connected to an account system, because every product uses a different one.
Replace `onSubmit` in `src/components/auth-card.tsx` with your provider's
sign-in call ([Auth.js](https://authjs.dev), Clerk, Supabase, Firebase, or
your own API). If your app lives elsewhere (for example `app.example.com`),
point the "Log in" and "Start free trial" links in `src/config/site.ts` there
and delete the auth pages.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |
| `npm run lint` | Check the code with ESLint |
| `npm run typecheck` | Check types |
| `npm run check` | Lint, type check and build in one go |

## Deploying

- **Vercel:** import the repository and set `NEXT_PUBLIC_SITE_URL` (and any
  webhooks) in the project's environment variables.
- **Any Node.js host:** run `npm run build`, then `npm start`.
- **Netlify, Cloudflare, Render, Railway:** all support Next.js; follow their
  Next.js guide and set the same environment variables.

## Project structure

```
src/
  app/                 Pages, metadata, sitemap, robots, share image, icon
  components/          Header, footer, forms and shared pieces
  components/sections/ The landing page sections
  components/ui/       shadcn/ui components
  config/site.ts       Brand and navigation
  content/             Landing page copy and blog posts
```

## Licence and support

This is a commercial product. Your licence (see `LICENSE`) covers one
developer and unlimited projects, including client work. Updates are in your
dashboard at [vipertecpro.com](https://vipertecpro.com). For help, email
vipertecpro@gmail.com.
