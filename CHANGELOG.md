# Changelog

## [2.1.0] - 2026-10-15

- Now free and open source under the MIT licence.

## [2.0.2] - 2026-10-05

- The motion switch in the header can now play animations on devices set to reduce motion, as well as pause them; the choice is remembered.
- Pausing animations now also stops the aurora, marquees and glowing borders.
- The live demo explains why animations are paused on devices set to reduce motion, with a button to play them.

## [2.0.1] - 2026-10-05

- The "Most popular" badge on the highlighted pricing plan is no longer cut off.

## [2.0.0] - 2026-10-05

- Rebuilt as the AI SaaS Launch Kit: 32 sections, each in its own file, chosen and ordered in `src/config/home.ts`.
- 3D: a particle-wave hero that follows the pointer, an interactive globe, a 3D bar chart and a scroll-driven 3D dive.
- Every page loads its content from typed API routes with dummy data; set `API_URL` to use your own backend.
- New sections include a prompt playground, before/after slider, ROI calculator, live feed, benchmark race, command palette, status board, code tabs, wall of love, roadmap with votes, stacking layers, careers and an inquiry form.
- A motion switch in the header, automatic section numbering and a scroll progress bar.
- `npm run release` packages a standalone, compressed build for manual deploys.

## [1.0.0] - 2026-10-04

- First release: landing page, pricing, blog, contact and auth pages, dark mode and SEO.
