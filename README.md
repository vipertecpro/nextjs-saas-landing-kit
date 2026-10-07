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

## Licence

Commercial licence: one developer, unlimited projects, including client and commercial work. You may not resell or share the source code.
See [LICENSE](LICENSE) or https://vipertecpro.com/legal/licence.

Support: vipertecpro@gmail.com
