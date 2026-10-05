import type { ReactNode } from "react";

/**
 * Blog posts. Each post is plain data plus its body as JSX, so there is no
 * Markdown pipeline to configure. Add a post by adding an entry; the blog
 * index, post page, sitemap and share image pick it up.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingMinutes: number;
  body: ReactNode;
};

export const posts: Post[] = [
  {
    slug: "public-roadmaps-reduce-support-tickets",
    title: "How a public roadmap cut our support tickets in half",
    description: "Customers stop asking “when?” when they can see the answer. Here is how we set ours up, and what we'd do differently.",
    date: "2026-09-18",
    author: "Priya Sharma",
    readingMinutes: 5,
    body: (
      <>
        <p>
          For a year, a third of our support inbox was the same question in different words: when will this ship? Publishing our roadmap
          answered it for everyone at once.
        </p>
        <h2>Start with three columns</h2>
        <p>
          Now, Next and Later is enough. Dates invite disappointment; columns set expectations without promising a day.
        </p>
        <ul>
          <li>
            <strong>Now:</strong> work that is actively being built.
          </li>
          <li>
            <strong>Next:</strong> what starts when the current work ships.
          </li>
          <li>
            <strong>Later:</strong> ideas we believe in but haven’t scheduled.
          </li>
        </ul>
        <h2>Let customers vote, but decide yourself</h2>
        <p>
          Votes are a signal, not a contract. We weigh them against revenue, effort and strategy, and we say so on the roadmap page.
        </p>
        <h2>Close the loop</h2>
        <p>
          The biggest win came from telling every voter the moment their request shipped. Replies to those emails turned into testimonials.
        </p>
      </>
    ),
  },
  {
    slug: "release-notes-people-read",
    title: "Writing release notes people actually read",
    description: "Lead with the benefit, show don't tell, and keep it short. A simple template that works for any product.",
    date: "2026-08-30",
    author: "Marcus Lee",
    readingMinutes: 4,
    body: (
      <>
        <p>Most release notes are written for the team that built the feature. Good ones are written for the person using it.</p>
        <h2>The template</h2>
        <pre>
          <code>{`## What’s new: <the benefit, in plain words>
<one sentence on who it helps and how>
<a screenshot or 10-second clip>
How to try it: <one step>`}</code>
        </pre>
        <h2>Three rules</h2>
        <ul>
          <li>Lead with what the reader can now do, not what you changed.</li>
          <li>One feature per note. Bundle small fixes into a single line.</li>
          <li>Always end with how to try it.</li>
        </ul>
      </>
    ),
  },
  {
    slug: "shipping-weekly-small-team",
    title: "Shipping every week with a team of four",
    description: "Small batches, a fixed release day and a ten-minute demo. The rhythm that keeps a small team shipping.",
    date: "2026-08-12",
    author: "Sofia Martins",
    readingMinutes: 6,
    body: (
      <>
        <p>We used to ship when things felt ready, which meant rarely. A fixed weekly rhythm changed that.</p>
        <h2>A fixed release day</h2>
        <p>Every Thursday, whatever is done ships. Unfinished work waits a week, which is never as bad as it sounds.</p>
        <h2>Small batches</h2>
        <p>If a change can’t ship in a week, we cut it into pieces that can, often behind a feature flag.</p>
        <h2>The ten-minute demo</h2>
        <p>Friday morning, everyone shows what shipped. It takes ten minutes and keeps the whole team proud of the work.</p>
      </>
    ),
  },
];

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
}
