# AI SaaS Launch Kit for Next.js

A complete marketing site for an AI product: 32 ready-made sections including 3D (a particle-wave hero, an interactive globe, a 3D chart and a scroll-driven 3D dive), a live AI demo,
pricing with a usage calculator, blog, changelog, comparison, waitlist with referrals, and auth pages. Every page loads its content from a typed
API, so you can switch from the built-in sample data to your own backend by setting one variable.

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · React Three Fiber · Motion

## Quick start

Requires Node.js 20.9 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000, and http://localhost:3000/components to see every section with its file and API path.

## Where things are

| To change | Edit |
| --- | --- |
| Name, navigation, footer, colour theme | `src/config/site.ts` |
| Which sections are on the home page, and their order | `src/config/home.ts` |
| Words and numbers of any section | `src/data/sections.ts` |
| Blog posts, changelog, comparison table | `src/data/posts.ts`, `src/data/pages.ts` |
| Colours, light and dark | `src/app/globals.css` (themes: `aurora`, `ocean`, `ember`) |
| A section's layout | `src/components/sections/<name>.tsx` (one file each) |

## Data and API

The sample data is served as JSON by the routes in `src/app/api`:

| Route | Returns |
| --- | --- |
| `GET /api/sections`, `GET /api/sections/{id}` | Section ids, one section's content |
| `GET /api/posts`, `GET /api/posts/{slug}` | Posts, one post |
| `GET /api/changelog`, `GET /api/comparison` | Releases, the comparison table |
| `GET /api/activity` | The newest event for the live feed |
| `GET /api/roadmap`, `POST /api/roadmap` | Roadmap votes; post `{"id": "forecasts", "vote": true}` |

Pages read data through `src/lib/api.ts`. To use your own backend, set `API_URL` (for example `https://api.example.com/v1`). It must answer
the same paths with the same JSON; `src/data/types.ts` describes every response.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run check` | Lint, type-check and build; all must pass with no warnings |
| `npm run release` | Production build packaged in `release/` (below) |
| `npm start` | Runs the packaged build from `release/app` |

## Deploying

`npm run release` creates:

- `release/app/`: the whole site, including only the dependencies it needs. Run it with `node server.js`.
- `release/<name>-<version>.tar.gz`: the same folder, compressed, to upload.

Copy the archive to any server with Node.js 20.9+, unpack it, and run `node server.js`. Set `PORT` (default 3000) and `HOSTNAME` (use
`127.0.0.1` behind a proxy such as nginx). Variables starting with `NEXT_PUBLIC_` are fixed at build time, so set them before running
`npm run release`.

It also deploys to Vercel, Netlify or any host that supports Next.js, with no changes.

## What you can build

The AI SaaS Launch Kit is a building block: the sections, the pages, the 3D scenes, the typed content API and the packaged build are done, and the product around them is yours. These ideas sit comfortably inside platform and advertising rules as long as everything on the page is true. The sample copy, numbers, logos and testimonials are placeholders; replace them with real ones before you publish, and never ship made-up reviews or invented customers.

**AI and developer products**

- **A launch site for an AI assistant or agent.** Use the hero, features, use-cases and pricing sections, and turn the prompt playground into a guided tour of real example questions. It plays back the answers you write; a live model behind it is your own backend.
- **A site for an API or developer tool.** The code tabs, integration hub, status board and changelog cover docs-style marketing, and `API_URL` points the pages at your own content service.
- **A pre-launch waitlist.** The waitlist page and referral section collect sign-ups; the forms forward each submission to a webhook you set in `.env`, such as your CRM or a form service. Collect only what you need and say what you do with it.

**Agencies and studios**

- **Landing pages for clients.** One licence covers unlimited projects, including client work. Change the name, theme (`aurora`, `ocean` or `ember`) and home-page section order in `src/config`, and hand the client a packaged build.
- **Productised-service sites.** Pricing with a usage calculator, a comparison table and a contact form for a consultancy or an automation shop.

**Products beyond AI**

- **Any SaaS marketing site.** The sections are generic enough for analytics, scheduling, finance or education tools. Swap the copy in `src/data/sections.ts` and remove sections you do not need.
- **A public roadmap and changelog.** The roadmap votes and release notes keep early users in the loop. The sample vote route keeps nothing between restarts, so storing votes durably needs your own backend.

The login, signup and forgot-password pages are screens only; real accounts, sessions and billing need your own backend or an auth provider. Add a cookie banner and privacy policy where the law requires them, and use this site's pricing and claims only for what your product really does.

## Licence

Commercial licence: one developer, unlimited projects, including client and commercial work. You may not resell or share the source code.
See [LICENSE](LICENSE) or https://vipertecpro.com/legal/licence.

Support: vipertecpro@gmail.com
